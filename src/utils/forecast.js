const request = require('request')

const darksky = 'https://api.darksky.net/forecast/'
const darkskytoken = 'c15cc743200bdcc48f1014642b1cf2e9'
// const temp = '/-70.8445,42.5923'

const forecast = (latitude, longitude, callback) => {
    const url = darksky + darkskytoken + '/' + latitude + ',' + longitude

    // console.log(url)

    request({ url, json: true }, (error, { statusCode, body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error, undefined) {
            callback(body.error)
        } else if (statusCode !== 200) {
            callback('Error in retrieving weather: ' + statusCode, undefined)
        } else {
            // const current = body.currently
            // const daily = body.daily
            var lowTemp = body.daily.data[0].temperatureLow;
            var highTemp = body.daily.data[0].temperatureHigh;
            var bearing = sector(parseInt(body.currently.windBearing, 10))

            callback(undefined, body.daily.data[0].summary +
                ' It is currently ' + body.currently.temperature +
                ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. ' +
                'The windspeed is ' + body.currently.windSpeed + ', coming out of the ' + bearing + '. ' +
                'Today\'s low: ' + lowTemp + ' degrees. ' +
                'Today\'s high: ' + highTemp + ' degrees. '
            )
        }
    })

    const sectors = ["N","NNEast","NEast","ENEast","East","ESEast","SEast","SSEast","South","SSWest","SWest","WSWest","West","WNWest","NWest","NNWest","North"]
    
    // https://www.campbellsci.com/blog/convert-wind-directions
    function sector(direction) {
        index = direction % 360
        index = Math.round(index  / 22.5) + 1
        return sectors[index]
    }
}

module.exports = forecast