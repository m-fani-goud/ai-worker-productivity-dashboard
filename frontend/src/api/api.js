const API_BASE = "https://ai-worker-productivity-dashboard-getg.onrender.com";

export async function getWorkerMetrics() {
  const res = await fetch(`${API_BASE}/api/metrics/workers`);
  return res.json();
}

export async function getFactoryMetrics() {
  const res = await fetch(`${API_BASE}/api/metrics/factory`);
  return res.json();
}

export async function getWorkstationMetrics() {
  const res = await fetch(`${API_BASE}/api/metrics/workstations`);
  return res.json();
}