const express = require("express");
const router = express.Router();

const {
  getWorkers,
  getFactory,
  getWorkstations   // ✅ comma added
} = require("../controllers/metricsController");

router.get("/workers", getWorkers);
router.get("/factory", getFactory);
router.get("/workstations", getWorkstations);

module.exports = router;