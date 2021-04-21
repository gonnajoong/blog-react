const path = require('path');
const serve = require('koa-static');
const mount = require('koa-mount');
const CONFIG = require('../config');

const maxage = CONFIG.cacheMaxAge;

module.exports = (app) => {
    app.use(mount('/dist', serve(path.join(__dirname, '../../dist'), {maxage})));
    app.use(mount('/', serve(path.join(__dirname, '../../public'))));
};
