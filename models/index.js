module.exports = function(app){
    return {
        gpio: require('./gpio/index')(app),
    };
}
