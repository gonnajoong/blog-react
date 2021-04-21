module.exports = {
    port: 3000,
    logFile: null,
    cacheMaxAge: 8640000000,
    apiPrefix: 'api',
    db: {
        host: '127.0.0.1',
        port: '3306',
        database: 'blog',
        username: 'root',
        password: 'root',
        timezone: '+09:00',
        platform: 'mysql',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        logging: false
    },
    jwt: {
        cookie: 'ACCESS-TOKEN',
        companyCookie: 'COMPANY-ACCESS-TOKEN',
        adminCookie: 'ADMIN-ACCESS-TOKEN',
        access: {
            key: 'ZkjP3Qzm0CIyVeec88HHtvs5i8IFuX8vL78LsNNCH3Q',
            ttl: 604800 // 60 * 60 * 24 * 7 = 1 week
        },
        refresh: {
            key: 'GFFukzLwIwTGnkeE2z92sRxtOyfcW6QFUWhSSp_0puw',
            ttl: 2592000 // 60 * 60 * 24 * 30 = 30 days
        }
    },
};
