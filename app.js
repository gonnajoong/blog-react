const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const userAgent = require('koa-useragent');
const CONFIG = require('./server/config');
const render = require('./server/methods/render');
const serve = require('./server/methods/serve');
const initialize = require('./server/methods/initialize');
const sequelize = require('./server/methods/sequelize');

const Body = require('./server/middleware/body');
const Log = require('./server/middleware/log');
const Language = require('./server/middleware/language');
const Validator = require('./server/middleware/validator');
const Sanitize = require('./server/middleware/sanitize');
const Model = require('./server/middleware/model');
const Meta = require('./server/middleware/meta');
const Util = require('./server/middleware/util');

const routes = require('./routes');

sequelize.sequelize.sync({
    force: false
}).then(async () => {
    const app = new Koa();

    app.use(bodyParser({
        enableTypes: ['json', 'form', 'text'],
    }));
    app.use(Body);
    app.use(userAgent);
    app.use(Log);
    app.use(Language);
    app.use(Validator);
    app.use(Sanitize);
    app.use(Meta);
    app.use(Util);

    app.use(Model);

    // methods
    serve(app);
    render(app);
    initialize(app);

    // router
    routes(app);

    const server = app.listen(CONFIG.port, () => {
        const host = server.address().address;
        const port = server.address().port;
        console.log(`Server listening at ${host}:${port}`);
    });

}).catch((e) => {
    console.error(e);
});
