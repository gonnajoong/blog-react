const STD = require('../metadata/standards');
const CODE = require('../metadata/codes');
const LANG = require('../metadata/langs');

module.exports = async (ctx, next) => {
    ctx.meta = {
        code: CODE,
        lang: LANG,
        std: STD
    };

    return next();
};
