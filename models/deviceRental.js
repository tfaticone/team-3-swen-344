'use strict';
module.exports = function (sequelize, DataTypes) {
    var DeviceRental = sequelize.define('DeviceRental', {
        returnCondition: DataTypes.ENUM('good', 'usable', 'broken'),
        comment: DataTypes.STRING,
        rentDate: DataTypes.DATE,
        dueDate: DataTypes.DATE,
        returnDate: DataTypes.DATE
    }, {});
    DeviceRental.associate = function (models) {
        models.DeviceRental.belongsTo(models.Device, {as: 'device'});
        models.DeviceRental.belongsTo(models.User, {as: 'renter'});
    };
    return DeviceRental;
};
