const metricsService = require("../services/metricsService");

exports.getWorkers = async (req, res) => {
  const data = await metricsService.getWorkerMetrics();
  res.json(data);
};

exports.getFactory = async (req, res) => {
  const data = await metricsService.getFactoryMetrics();
  res.json(data);
};
exports.getWorkstations = async (req, res) => {
  const data = await metricsService.getWorkstationMetrics();
  res.json(data);
};