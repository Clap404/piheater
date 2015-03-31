module.exports = function(app){
    return {
        sensors: require('./sensors')(app),
    }
}
