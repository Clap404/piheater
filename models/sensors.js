module.exports = function(app){
    var bookshelf = app.get('bookshelf');

    var Sensor = bookshelf.Model.extend({
        tableName: 'sensor',
    });

    var Heater = bookshelf.Model.extend({
        tableName: 'heater',
    });

    return {
        Heater: Heater,
        Sensor: Sensor,
    };
}
