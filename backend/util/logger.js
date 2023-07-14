const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "log/error.log", level: "warn" }),
    new winston.transports.File({ filename: "log/app.log" }),
  ],
});

module.exports = logger