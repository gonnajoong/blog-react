const jwt = require('jsonwebtoken');
const CONFIG = require('../config');
const ALGORITHM = 'HS256';
const ACCESS = CONFIG.jwt.access;
const REFRESH = CONFIG.jwt.refresh;
const COOKIE = CONFIG.jwt.cookie;
const COMPANY_COOKIE = CONFIG.jwt.companyCookie;
const ADMIN_COOKIE = CONFIG.jwt.adminCookie;

module.exports = {
    parseToken: (ctx) => {
        if (ctx.header.authorization) {
            return ctx.header.authorization.replace('Bearer ', '');
        } else if (ctx.header[COOKIE.toLowerCase()]) {
            return ctx.header[COOKIE.toLowerCase()];
        } else if (ctx.cookies.get(COOKIE)) {
            return ctx.cookies.get(COOKIE);
        } else {
            return null;
        }
    },
    parseCompanyToken: ctx => {
        if (ctx.cookies.get(COMPANY_COOKIE)) {
            return ctx.cookies.get(COMPANY_COOKIE);
        } else if (ctx.header[COMPANY_COOKIE.toLowerCase()]) {
            return ctx.header[COMPANY_COOKIE.toLowerCase()];
        } else {
            return null;
        }
    },
    parseAdminToken: ctx => {
        if (ctx.cookies.get(ADMIN_COOKIE)) {
            return ctx.cookies.get(ADMIN_COOKIE);
        } else {
            return null;
        }
    },
    generateAccessToken: (user) => {
        delete user.salt;
        delete user.secret;
        return new Promise((resolve, reject) => {
            jwt.sign(user, ACCESS.key, {
                algorithm: ALGORITHM,
                expiresIn: ACCESS.ttl
            }, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            });
        });
    },
    verifyAccessToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, ACCESS.key, {
                algorithm: ALGORITHM
            }, (err, payload) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(payload);
                }
            });
        });
    },
    generateRefreshToken: (key) => {
        return new Promise((resolve, reject) => {
            jwt.sign({key}, REFRESH.key, {
                algorithm: ALGORITHM,
                expiresIn: REFRESH.ttl
            }, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            });
        });
    },
    verifyRefreshToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, REFRESH.key, {
                algorithm: ALGORITHM
            }, (err, payload) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(payload);
                }
            });
        });
    },
    setCookie: (ctx, token) => {
        ctx.cookies.set(COOKIE, token, {httpOnly: true});
    },
    setCompanyCookie: (ctx, token) => {
        ctx.cookies.set(COMPANY_COOKIE, token, {httpOnly: true});
    },
    setAdminCookie: (ctx, token) => {
        ctx.cookies.set(ADMIN_COOKIE, token, {httpOnly: true});
    },
};
