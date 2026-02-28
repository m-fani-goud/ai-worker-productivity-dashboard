const BASE_URL = "http://localhost:4000/api";

export async function getWorkerMetrics() {
  const res = await fetch(`${BASE_URL}/metrics/workers`);
  return res.json();
}

export async function getFactoryMetrics() {
  const res = await fetch(`${BASE_URL}/metrics/factory`);
  return res.json();
}
export async function getWorkstationMetrics() {
  const res = await fetch(`${BASE_URL}/metrics/workstations`);
  return res.json();
}