module.exports = function(app){
    return {
        heater: require('./heater'),
        sensor: require('./sensor'),
    };
}
