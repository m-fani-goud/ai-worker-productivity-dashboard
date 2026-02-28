const prisma = require("../config/prisma");

exports.seedData = async (req, res) => {
  try {

    const workers = [
      { workerId: "W1", name: "Ravi" },
      { workerId: "W2", name: "Sita" },
      { workerId: "W3", name: "Arjun" },
      { workerId: "W4", name: "Meena" },
      { workerId: "W5", name: "Kiran" },
      { workerId: "W6", name: "Priya" }
    ];

    const stations = [
      { stationId: "S1", name: "Assembly" },
      { stationId: "S2", name: "Packaging" },
      { stationId: "S3", name: "Inspection" },
      { stationId: "S4", name: "Cutting" },
      { stationId: "S5", name: "Welding" },
      { stationId: "S6", name: "Finishing" }
    ];

    for (const w of workers) {
      await prisma.worker.upsert({
        where: { workerId: w.workerId },
        update: {},
        create: w
      });
    }

    for (const s of stations) {
      await prisma.workstation.upsert({
        where: { stationId: s.stationId },
        update: {},
        create: s
      });
    }

    res.json({ message: "Seeded successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Seed failed" });
  }
};