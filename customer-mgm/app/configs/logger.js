const winston = require("winston");

var logger = new winston.Logger({
    level: 'info',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'sysout.log' })
    ]
});

module.exports = logger;