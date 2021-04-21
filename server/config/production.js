module.exports = {
    port: 10000,
    db: {
        host: '210.103.188.121',
        port: '8306',
        database: 'joy37',
        username: 'joy37',
        password: 'eney12!@',
        timezone: '+09:00',
        platform: 'mysql',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        logging: false
    },
    file: {
        s3: {
            accessKey: 'AKIAUM3WGD2VVGPUTC6C',
            secretKey: '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',
            region: 'ap-northeast-2',
            bucket: 'joy37',
        }
    }
};
