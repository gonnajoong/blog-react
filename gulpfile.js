const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const args = require('get-gulp-args')();

const ENV_DEVELOPMENT = 'development';
const now = new Date().getTime();

if (!args.env) {
    args.env = process.env.NODE_ENV = ENV_DEVELOPMENT;
} else {
    process.env.NODE_ENV = args.env;
}
const distPath = './dist';
if (!fs.existsSync(distPath)) fs.mkdirSync(distPath);

const modulePages = fs.readdirSync(path.join(__dirname, './pages/'));
modulePages.forEach((page) => {
    if (!fs.existsSync(`${distPath}/${page}.js`)) fs.writeFileSync(`${distPath}/${page}.js`, '');
    if (!fs.existsSync(`${distPath}/${page}.css`)) fs.writeFileSync(`${distPath}/${page}.css`, '');
});

console.log("NODE_ENV=", process.env.NODE_ENV);
console.log("v=", now);

gulp.task('build', ['webpack-watch']);

gulp.task('webpack-watch', () => {
    console.log('webpack-watch');
    let webpackConfig = require('./webpack.config');

    if (process.env.NODE_ENV === ENV_DEVELOPMENT) {
        webpackConfig.watch = true;
    }

    webpackConfig.entry = {};

    modulePages.forEach(page => {
        webpackConfig.entry[page] = './pages/'+ page +'/module.js';
    });

    return gulp.src('')
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('dist'));
});
