const prisma = require("../config/prisma");
const { generateHash } = require("../utils/hash");

exports.ingestEvent = async (req, res) => {
  try {
    const event = req.body;

    const eventHash = generateHash(event);

    const exists = await prisma.event.findUnique({
      where: { eventHash }
    });

    if (exists) {
      return res.json({ message: "Duplicate ignored" });
    }

    await prisma.event.create({
      data: {
        timestamp: new Date(event.timestamp),
        workerId: event.worker_id,
        workstationId: event.workstation_id,
        eventType: event.event_type,
        confidence: event.confidence,
        count: event.count || null,
        eventHash
      }
    });

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Event ingestion failed" });
  }
};