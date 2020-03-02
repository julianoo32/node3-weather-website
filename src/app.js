const path = require('path');
const express = require('express');
const hbs = require('hbs');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000

const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const geoCode = require('./utils/geocodes');
const forecast = require('./utils/forecast');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

const creater = 'QuangTM';
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead',
        creater: creater
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead',
        creater: creater
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message',
        title: 'Help',
        name: 'Andrew Mead',
        creater: creater
    })
})
app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({
            error: 'No address was found'
        });
    }

    geoCode(address, (geoerror, { latitude, longtitude, location } = {}) => {
        if (geoerror) {
            return res.send({
                error: geoerror
            })
        }

        forecast(latitude, longtitude, (forecastError, forecastData) => {
            if (forecastError) {
                return res.send({
                    error: forecastError
                })
            }
            res.send({
                location: address,
                foundLocation: location,
                forecastData: forecastData
            })
            
        });
    });
});
app.get('/products', (req, res) => {
    const { search, rating } = req.query;
    if (!search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: [],
    })
});
app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        title: '404',
        message: 'Help article not found',
        creater: creater
    });
});

app.get('*', (req, res) => {
    res.render('pageNotFound', {
        title: '404',
        message: 'Page Not Found',
        creater: creater
    });
})
app.listen(port, () => {
    console.log('Server is up on port: '+port);
});

// nodemon src/app.js -e js,hbs

