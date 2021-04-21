const CODE = require('../metadata/codes');

module.exports = async (ctx, next) => {

    ctx.json = async (data, status = 200, message) => {
        ctx.status = status;
        ctx.body = {
            "code": "0000",
            "timestamp": new Date().getTime()
        };
        if (data) ctx.body['data'] = data;
        if (message) ctx.body['message'] = message;
    };

    ctx.error = async (code, status = 400) => {
        let key;
        if (code.indexOf(':') !== -1) {
            let temp = code.split(':');
            key = temp[1];
            code = temp[temp.length - 1];
        }
        ctx.status = status;
        ctx.body = {
            "code": code,
            "timestamp": new Date().getTime()
        };
        if (CODE[ctx.language] && CODE[ctx.language][code]) {
            let m = CODE[ctx.language][code];
            if (key) {
                m = m.replace(':key:', key);
            }
            ctx.body['message'] = m;
        }
    };

    await next();
};
