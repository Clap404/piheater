module.exports = function(app){
    return {
        gpio: require('./gpio/index')(app),
        sensors: require('./sensors')(app),
    }
}
