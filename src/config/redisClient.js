const { Redis } = require("ioredis");

const client = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

client.on("connect", () => {
  console.log("Redis Connected");
});

client.on("error", (err) => {
  console.log("Redis Error:", err);
});

module.exports = client;
