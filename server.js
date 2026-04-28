require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./src/models");
const {limiter} = require("./src/middlewares/rateLimiter");
const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);

const userRoute = require("./src/routes/userRoute");
const contentRoute = require("./src/routes/contentRoute");
const contentSlotRoute = require("./src/routes/contentSlotRoute");
const contentScheduleRoute = require("./src/routes/contentScheduleRoute");
const contentBroadCastingRoute = require("./src/routes/contentBroadCastingRoute");

app.get("/home", (req, res) => {
  res.status(200).json({ message: "LMS is live" });
});

app.use("/api", userRoute);
app.use("/api/contents", contentRoute);
app.use("/api/slots", contentSlotRoute);
app.use("/api/contentSchedule", contentScheduleRoute);
app.use("/api/broadCast", contentBroadCastingRoute);

app.use((req, res) => {
  res.status(404).json({ status: "fail", message: "route not found" });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await sequelize.sync({ alter: true });
    console.log("Tables synced");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start:", err);
  }
};

start();
