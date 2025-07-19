const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const fs = require("fs");
const path = require("path");

// Ensure log directory exists
const logDir = path.join(__dirname,'..','..','logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Truncate (clear) log file on restart
// const date = new Date().toISOString().split('T')[0];
// const logFilePath = path.join(logDir, `app-${date}.log`);

// fs.writeFileSync(logFilePath, "");

// Logger Configuration
const logger= (fileName,logFile) => createLogger({
    level: "silly",
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(({ timestamp, level, message }) => `${String(level.toUpperCase()).padEnd(6,' ')}: In ${String(fileName).padEnd(35,' ')} : ${timestamp} -- ${message}`)
    ),
    transports: [
        new transports.Console({ format: format.combine(format.colorize()) }),

        // ✅ Log Rotation - Rotates daily & keeps logs for 14 days
        new DailyRotateFile({
            filename: path.join(logDir, `${logFile}-%DATE%.log`),
            datePattern: "YYYY-MM-DD",
            maxSize: "15m", // Rotate when file size > 15MB
            maxFiles: 5,
            zippedArchive: true, // Compress old logs
        }),
    ],
});

module.exports = logger;
