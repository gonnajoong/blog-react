const fs = require('fs');
const path = require('path');

const publicPath = path.join(__dirname, '../../public');

module.exports = async (app) => {
    if (!fs.existsSync(publicPath)) fs.mkdirSync(publicPath);
};
