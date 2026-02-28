const prisma = require("../config/prisma");

function calculateDurations(events) {
  let active = 0;
  let idle = 0;
  let absent = 0;
  let units = 0;

  for (let i = 0; i < events.length - 1; i++) {
    const current = events[i];
    const next = events[i + 1];

    const duration =
      (new Date(next.timestamp) - new Date(current.timestamp)) / 1000;

    if (current.eventType === "working") active += duration;
    if (current.eventType === "idle") idle += duration;
    if (current.eventType === "absent") absent += duration;

    if (current.eventType === "product_count") {
      units += current.count || 0;
    }
  }

  return { active, idle, absent, units };
}

exports.getWorkerMetrics = async () => {

  const workers = await prisma.worker.findMany({
    include: { events: true }
  });

  return workers.map(worker => {

    const events = worker.events.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    const { active, idle, absent, units } =
      calculateDurations(events);

    const totalTime = active + idle + absent;
    const utilization = totalTime ? active / totalTime : 0;
    const hours = active / 3600;

    return {
      workerId: worker.workerId,
      name: worker.name,
      activeTime: active,
      idleTime: idle,
      utilization,
      unitsProduced: units,
      unitsPerHour: hours ? units / hours : 0
    };
  });
};

exports.getFactoryMetrics = async () => {

  const workers = await exports.getWorkerMetrics();

  let totalUnits = 0;
  let totalActive = 0;
  let utilizationSum = 0;

  workers.forEach(w => {
    totalUnits += w.unitsProduced;
    totalActive += w.activeTime;
    utilizationSum += w.utilization;
  });

  return {
    totalProduction: totalUnits,
    totalActiveTime: totalActive,
    avgUtilization:
      workers.length ? utilizationSum / workers.length : 0
  };
};
exports.getWorkstationMetrics = async () => {

  const stations = await prisma.workstation.findMany({
    include: { events: true }
  });

  return stations.map(station => {

    const events = station.events.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    let occupiedTime = 0;
    let units = 0;

    for (let i = 0; i < events.length - 1; i++) {

      const current = events[i];
      const next = events[i + 1];

      const duration =
        (new Date(next.timestamp) - new Date(current.timestamp)) / 1000;

      if (current.eventType === "working") {
        occupiedTime += duration;
      }

      if (current.eventType === "product_count") {
        units += current.count || 0;
      }
    }

    const hours = occupiedTime / 3600;
    const throughput = hours ? units / hours : 0;

    return {
      stationId: station.stationId,
      name: station.name,
      occupancyTime: occupiedTime,
      utilization: occupiedTime > 0 ? 1 : 0,
      unitsProduced: units,
      throughputRate: throughput
    };
  });
};