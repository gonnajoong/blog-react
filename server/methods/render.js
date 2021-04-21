const path = require('path');
const render = require('koa-ejs');

module.exports = (app) => {
    render(app, {
        root: path.join(__dirname, '../views'),
        layout: false,
        viewExt: 'ejs',
        cache: false,
        debug: false
    });
};
