module.exports = function(app){
    var bookshelf = app.get('bookshelf');

    var Sensor = bookshelf.Model.extend({
        tableName: 'sensor',
    });

    var Heater = bookshelf.Model.extend({
        tableName: 'heater',
        gpio: function() {
            return this.hasMany(Heater_GPIO);
        }
    });

    var Heater_GPIO = bookshelf.Model.extend({
        tableName: 'heater_gpio',
        heater: function() {
            return this.belongsTo(Heater);
        },
    });

    return {
        Heater: Heater,
        Heater_GPIO: Heater_GPIO,
        Sensor: Sensor,
    };
}
