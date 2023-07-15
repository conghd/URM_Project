const winston = require("winston");
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.splat(),
    myFormat,
    //winston.format.simple()
  ),
  transports: [
    new transports.File({ filename: "log/error.log", level: "warn" }),
    new transports.File({ filename: "log/info.log" }),
  ],
});

module.exports = logger