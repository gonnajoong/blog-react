const path = require('path');
const Router = require('koa-router');
const recursive = require('recursive-readdir-synchronous');
const router = new Router();
const CONFIG = require('../config');

const apiPath = path.join(__dirname, '../api');
const ignorePath = ['del.js', 'get.js', 'gets.js', 'post.js', 'put.js', 'puts.js'];
const splitItem = process.platform === "win32" ? '\\' : '/';

const API_PATH = CONFIG.apiPrefix ? `/${CONFIG.apiPrefix}` : ''; // '/api'

let virtualPaths = [];
const paths = recursive(apiPath, ignorePath).map((file) => {
    let temp = file.replace(apiPath, '').split(splitItem);
    let virtualTemp = temp.map((resource) => {
        if (resource.indexOf('_') === 0) {
            resource = resource.replace('_', ':');
        }
        return resource;
    });
    virtualPaths.push(virtualTemp.splice(0, virtualTemp.length - 1).join('/'));
    return temp.splice(0, temp.length - 1).join('/');
});

paths.forEach((path, index) => {
    const subRouter = require(apiPath + path + '/define').router;
    router.use(API_PATH + virtualPaths[index], subRouter.routes(), subRouter.allowedMethods());
});

module.exports = router.routes();
