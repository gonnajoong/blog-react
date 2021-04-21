const path = require('path');
const Router = require('koa-router');
const router = new Router();

const fileName = path.basename(__filename).split('.')[0];

module.exports = (app) => {
    router.get(`/${fileName}`, render);
    router.get(`/${fileName}/*`, render);

    app.use(router.routes(), router.allowedMethods());
};

async function render(ctx) {
    await ctx.render(`${fileName}-render`);
}
