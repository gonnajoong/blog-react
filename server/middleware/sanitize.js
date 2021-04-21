module.exports = async (ctx, next) => {

    ctx.sanitize = sanitize(ctx);

    await next();
};

function sanitize(ctx) {
    return {
        toBoolean: (key) => {
            setParams(ctx, key, (value) => {
                if (value === 'true' || value === true || value === 1 || value === '1') {
                    return true;
                } else if (value === 'false' || value === false || value === 0 || value === '0') {
                    return false;
                } else {
                    return null;
                }
            });
        }
    };
}

function setParams(ctx, key, callback) {
    if (ctx.params && ctx.params[key] !== undefined && ctx.params[key] !== undefined) {
        ctx.params[key] = callback(ctx.params[key]);
    } else if (ctx.query && ctx.query[key] !== undefined && ctx.query[key] !== null) {
        ctx.query[key] = callback(ctx.query[key]);
    } else if (ctx.request && ctx.request.body && ctx.request.body[key] !== undefined && ctx.request.body !== null) {
        ctx.request.body[key] = callback(ctx.request.body[key]);
    }
}
