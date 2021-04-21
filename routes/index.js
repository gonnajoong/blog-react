const path = require('path');
const Router = require('koa-router');
const router = new Router();

module.exports = (app) => {
    router.get(`/`, render);

    app.use(router.routes(), router.allowedMethods());
};

async function render(ctx) {
    await ctx.render(`blog-render`);
}
