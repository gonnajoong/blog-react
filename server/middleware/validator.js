const intExp = new RegExp('^[-]?[0-9]*$');
const floatExp = new RegExp('^[-]?[0-9]*[\.]?[0-9]+$');
const emailExp = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

module.exports = async (ctx, next) => {

    ctx.check = check(ctx);
    ctx.checkParams = checkParams(ctx);

    await next();
};

function checkParams(ctx) {
    return function (params) {
        if (params && params.acceptable && params.essential) {
            // for (let i=0; i<params.acceptable.length; i++) {
            //
            // }
            for (let i=0; i<params.essential.length; i++) {
                if (!getParams(ctx, params.essential[i])) {
                    ctx.throw(400, '0951');
                }
            }
        } else {
            ctx.throw(400, '0950');
        }
    }
}

function check(ctx) {

    const response = (status, data) => {
        ctx.throw(status, data);
    };

    return {
        isInt: (key) => {
            const param = getParams(ctx, key);
            if (param && !intExp.test(param)) {
                response(400, `:${key}:0901`);
            }
        },
        isFloat: (key) => {
            const param = getParams(ctx, key);
            if (param && !floatExp.test(param)) {
                response(400, `:${key}:0902`);
            }
        },
        isEmail: (key) => {
            const param = getParams(ctx, key);
            if (param && !emailExp.test(param)) {
                response(400, `:${key}:0903`);
            }
        },
        isBoolean: (key) => {
            const param = getParams(ctx, key);
            if (param && param !== 'true' && param !== 'false' && param !== true && param !== false && param !== 1 && param !== 0 && param !== '1' && param !== '0') {
                response(400, `:${key}:0904`);
            }
        },
        isDate: (key) => {
            const param = getParams(ctx, key);
            if (param) {
                const date = new Date(param);
                if (isNaN(date.getTime())) {
                    response(400, `:${key}:0905`);
                }
            }
        },
        len: (key, min = null, max = null) => {
            const param = getParams(ctx, key);
            if (typeof min === 'number' && typeof max === 'number') {
                if (param && (param.length < min || param.length > max)) {
                    response(400, `:${key}:0906`);
                }
            } else {
                throw new Error('argument is essential and integer type');
            }
        },
        isRegExp: (key, RegExp) => {
            const param = getParams(ctx, key);
            if (param && !RegExp.test(param)) {
                response(400, `:${key}:0907`);
            }
        },
        isEnum: (key, enumList) => {
            const param = getParams(ctx, key);
            if (param && enumList.indexOf(param) === -1) {
                response(400, `:${key}:0908`);
            }
        }
    };
}

function getParams(ctx, key) {
    if (ctx.params && ctx.params[key] !== undefined && ctx.params[key] !== undefined) {
        return ctx.params[key] + '';
    } else if (ctx.query && ctx.query[key] !== undefined && ctx.query[key] !== null) {
        return ctx.query[key] + '';
    } else if (ctx.request && ctx.request.body && ctx.request.body[key] !== undefined && ctx.request.body[key] !== null) {
        return ctx.request.body[key] + '';
    } else {
        return null;
    }
}
