const model = require('../methods/sequelize').sequelize;

module.exports = async (ctx, next) => {
    ctx.models = model.models;

    return next();
};
