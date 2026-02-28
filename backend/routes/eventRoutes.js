const express = require("express");
const router = express.Router();
const { ingestEvent } = require("../controllers/eventController");

router.post("/", ingestEvent);

module.exports = router;