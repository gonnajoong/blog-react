const Sequelize = require('sequelize');

const DB = require('../config').db;

let sequelize = new Sequelize(DB.database, DB.username, DB.password, {
    host: DB.host,
    port: DB.port || '3306',
    timezone: DB.timezone,
    dialect: DB.platform,
    operatorsAliases: false,

    define: {
        dialectOptions: {
            charset: DB.charset,
            collate: DB.collate
        }
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    logging: DB.logging
});

module.exports = {
    sequelize: sequelize,
    getDBStringLength: () => {
        return DB.charset === 'utf8mb4' ? 191 : 255;
    },
    defineAll: (modelSchemas) => {
        let models = {};

        //define models
        Object.keys(modelSchemas).forEach((key) => {
            let modelSchema = modelSchemas[key];
            models[key] = sequelize.define(key, modelSchema.fields, modelSchema.options);
        });

        Object.keys(modelSchemas).forEach((key) => {
            let modelSchema = modelSchemas[key];
            let Model = models[key];

            //Associations
            if (modelSchema.associations instanceof Array) {
                modelSchema.associations.forEach((association) => {
                    if (association.belongsTo) {
                        Model.belongsTo(models[association.belongsTo], {
                            foreignKey: association.foreignKey,
                            targetKey: association.targetKey,
                            otherKey: association.otherKey,
                            as: association.as,
                            scope: association.scope
                        });
                    } else if (association.hasMany) {
                        Model.hasMany(models[association.hasMany], {
                            foreignKey: association.foreignKey,
                            targetKey: association.targetKey,
                            otherKey: association.otherKey,
                            as: association.as,
                            scope: association.scope
                        });
                    } else if (association.hasOne) {
                        Model.hasOne(models[association.hasOne], {
                            foreignKey: association.foreignKey,
                            targetKey: association.targetKey,
                            otherKey: association.otherKey,
                            as: association.as,
                            scope: association.scope
                        });
                    } else if (association.belongsToMany) {
                        Model.hasOne(models[association.belongsToMany], {
                            foreignKey: association.foreignKey,
                            targetKey: association.targetKey,
                            otherKey: association.otherKey,
                            as: association.as,
                            scope: association.scope
                        });
                    }
                });
            }

            // Instance Methods
            // extend(Model.prototype, mixin.instanceMethods);
            if (modelSchema.methods && modelSchema.methods.instanceMethods) {
                extend(Model.prototype, modelSchema.methods.instanceMethods);
            }

            // Class Methods
            // extend(Model, mixin.classMethods);
            if (modelSchema.methods && modelSchema.methods.classMethods) {
                extend(Model, modelSchema.methods.classMethods);
            }
        });

        sequelize.models = models;

        return models;
    }
};

function extend(object1, object2) {
    if (object1 instanceof Object && object2 instanceof Object) {
        for (let key in object2) {
            object1[key] = object2[key];
        }
    }
}
