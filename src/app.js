// core modules
const path = require('path')

// npm modules
const express = require('express')
// needed for partials
const hbs = require('hbs')
// functionality
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast.js')


// console.log(__dirname) // full directory path
// console.log(path.join(__dirname, '../public')) // full file path

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
// dynamic views path
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// tell express which templating engine we installed
app.set('view engine', 'hbs') // expects in 'views'
// setup handlebars engine and views location
app.set('views', viewsPath)
// set partials
hbs.registerPartials(partialsPath)

// customize server & express app - setup static directory to serve
app.use(express.static(publicDirPath))


const author = 'Robert Murray'

/*
    routes to handle
*/
// because app.use above captures root requests and redirects
// to static path + index.html (special meaning name)
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// }) // root route


// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Robert',
//         position: 'Software Engineer',
//         company: 'EIS'
//     })
// })

// app.get('/about.*', (req, res) => {
//     res.render('/about.html')
// })

app.get('', (req, res) => {
    res.render('index', {// match name of template
        title: 'Welcome to Your Weather App!',
        name: 'Robert Murray'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About the Weather App.',
        name: author
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App Help FAQs',
        helptext: 'Welcome to our helpful comments for today.',
        name: author
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        // https://stackoverflow.com/questions/48433008/js-es6-destructuring-of-undefined
        if (error) {
            return res.send({ error: error })
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error: error })
            }
            res.send({
                forecast: forecast,
                location: location,
                address: req.query.address,
                name: author
            })
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    // console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found.',
        name: author
    })
})

/*
    default 404 - catch all option available for matching
*/
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found.',
        name: author
    })
})

/*
    server start up
*/
app.listen(3000, () => {
    console.log('Server is up on port 3000.') // useful info on startup
})