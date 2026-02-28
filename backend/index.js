require("dotenv").config();

const express = require("express");
const cors = require("cors");

const eventRoutes = require("./routes/eventRoutes");
const metricsRoutes = require("./routes/metricsRoutes");
const seedRoutes = require("./routes/seedRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Factory API Running");
});

app.use("/api/events", eventRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/seed", seedRoutes);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});