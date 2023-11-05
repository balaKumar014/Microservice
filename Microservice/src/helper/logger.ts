const winston = require('winston');
import 'winston-daily-rotate-file';

export class ApiLogger {
    public static newInstance() {
        return winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'backend' },
            transports: [new winston.transports.DailyRotateFile({ level: process.env.LOG_LEVEL, datePattern: 'dd-MM-yyyy.', dirname: './logs', filename: './log', prepend: true }), new winston.transports.Console({ colorize: true, prettyPrint: true })],
        });
    }
}

export default ApiLogger.newInstance();
