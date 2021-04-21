const jwt = require('../utils/jwt');

module.exports = async (ctx, next) => {
    const token = jwt.parseToken(ctx);
    const companyToken = jwt.parseCompanyToken(ctx);
    const adminToken = jwt.parseAdminToken(ctx);

    if (token) {
        try {
            ctx.user = await jwt.verifyAccessToken(token);
        } catch (e) {
            // token expired or verify failed
        }
    }

    if (companyToken) {
        try {
            ctx.companyUser = await jwt.verifyAccessToken(companyToken);
        } catch (e) {
            // token expired or verify failed
        }
    }

    if (adminToken) {
        try {
            ctx.adminUser = await jwt.verifyAccessToken(adminToken);
        } catch (e) {
            // token expired or verify failed
        }
    }

    await next();
};
