import { useEffect, useState } from "react";
import {
  getWorkerMetrics,
  getFactoryMetrics,
  getWorkstationMetrics
} from "../api/api";

import FactorySummary from "../components/FactorySummary";
import WorkerTable from "../components/WorkerTable";
import WorkstationTable from "../components/WorkstationTable";

export default function Dashboard() {

  const [workers, setWorkers] = useState(null);
  const [factory, setFactory] = useState(null);
  const [stations, setStations] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {

    const workerData = await getWorkerMetrics();
    const factoryData = await getFactoryMetrics();
    const stationData = await getWorkstationMetrics();

    setWorkers(workerData);
    setFactory(factoryData);
    setStations(stationData);
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>AI Worker Productivity Dashboard</h1>

      <FactorySummary data={factory} />

      <WorkerTable workers={workers} />

      <WorkstationTable stations={stations} />
    </div>
  );
}