module.exports = async (ctx, next) => {
    if (ctx.request.headers['content-type'] === 'text/plain') {
        try {
            ctx.request.body = parse(ctx.request.body);
        } catch (e) {}
    }

    await next();
};

function parse(text) {
    try {
        if (text) {
            let result = {};
            const list = text.split('&');
            list.forEach((item, index) => {
                const keyValue = item.split('=');
                if (keyValue.length === 2) {
                    result[keyValue[0]] = decodeURIComponent(keyValue[1]);
                }
            });
            return result;
        } else {
            return {};
        }
    } catch (e) {
        return {};
    }
}
