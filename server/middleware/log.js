const fs = require('fs');
const path = require('path');
const morgan = require('koa-morgan');
const CONFIG = require('../config');

if (CONFIG.logFile) {
    const logPath = path.join(__dirname, '../../logs');
    if (!fs.existsSync(logPath)) fs.mkdirSync(logPath);
    const accessLogStream = fs.createWriteStream(`${logPath}/${CONFIG.logFile}`, { flags: 'a' });

    module.exports = morgan('combined', { stream: accessLogStream });
} else {
    module.exports = morgan('combined');
}
