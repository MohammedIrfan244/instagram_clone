import {createLogger, format, transports} from 'winston'

const {combine,colorize,timestamp,json}=format

const consoleFormat=combine(
    format.colorize(),
    format.printf(({level, message, timestamp})=>`${timestamp} ${level}: ${message}`)
)

const logger=createLogger({
    level:'info',
    format:combine(
        colorize(),
        timestamp(),
        json()
    ),
    transports:[new transports.Console({format:consoleFormat}), new transports.File({filename:'app.log'})]
})

export default logger