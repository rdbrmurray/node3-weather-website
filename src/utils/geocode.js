const request = require('request')


const mapboxtoken = 'pk.eyJ1IjoicmRicm11cnJheSIsImEiOiJjanVwbXNlbDgyM3N5NGRtaW44OXg2cTN6In0.vPe312j9e5VuNbXW19rveA'
const mapboxplaces = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'

const geocode = (address, callback) => {
    const url = mapboxplaces + encodeURIComponent(address) + '.json?access_token=' + mapboxtoken

    // console.log(url)

    request({ url, json: true }, (error, { statusCode, body } = {}) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (statusCode !== 200) {
            callback(body.message)
        } else if (body.features.length === 0) {
            callback('Unable to find information for location ' + address)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode