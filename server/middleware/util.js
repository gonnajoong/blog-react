const utils = require('../utils');

module.exports = async (ctx, next) => {

    ctx.utils = utils;

    await next();
};
