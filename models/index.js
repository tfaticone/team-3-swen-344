'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var db = {};


/* We're not using this database config yet. A Heroku plugin gives us 2 databases already. */
/*
var config = require(__dirname + '/..\config\config.json')[env];
if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
*/

// establish the connection
var dbUrl = process.env.JAWSDB_URL;
var sequelize = new Sequelize(dbUrl, {
    dialect: 'mysql'
});

// test the connection
sequelize
    .authenticate()
    .then(function () {
        console.log('[DATABASE] Connection has been established successfully.');
    })
    .catch(function (err) {
        console.error('[DATABASE] Unable to connect to the database:', err);
    });

// import all model definitions
fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
