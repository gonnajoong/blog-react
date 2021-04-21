module.exports = async (ctx, next) => {
    ctx.language = 'ko';

    return next();
};
