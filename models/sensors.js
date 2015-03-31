module.exports = function(app){
    var bookshelf = app.get('bookshelf');

    var TypeSensor = bookshelf.Model.extend({
        tableName: 'type_sensor',
        sensors: function() {
            return this.hasMany(Sensor);
        },
    });

    var Sensor = bookshelf.Model.extend({
        tableName: 'sensor',
        type_sensor: function() {
            return this.belongsTo(TypeSensor);
        },
    });

    return {
        TypeSensor: TypeSensor,
        Sensor: Sensor,
    };
}
