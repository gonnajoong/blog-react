const Sequelize = require('sequelize');
const sequelize = require('../methods/sequelize').sequelize;
const DB = require('../config').db;
const getDBStringLength = require('../methods/sequelize').getDBStringLength;
const STD = require('../metadata/standards');

module.exports = {
    fields: {
        'host': {
            type: Sequelize.STRING(getDBStringLength()),
            allowNull: false
        }
    },
    options: {
        timestamps: true,
        charset: DB.charset,
        collate: DB.collate
    },
    methods: {
        instanceMethods: {},
        classMethods: {

        }
    }
};
