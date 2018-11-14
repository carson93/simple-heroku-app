const express = require('express');
const hbs = require('hbs')
const weather = require('./weather')
const fs = require('fs')

const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('message', (text) => {
	return text.toUpperCase();
})

app.use('/', (request, response, next) => {
	var time = new Date().toString();

	var log = `${time}: ${request.method} ${request.url}`
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log('Unable to log message')
		}
	})
	next()
})

app.use('/', (request, response, next) => {
	var time = new Date().toString();
	response.render('maint.hbs', {
		datetime: time
	})
})


// hbs.registerHelper('getWeather', (address) => {
// 	getTheWeather(address)
// })

// var getTheWeather = weather.getAddress(address, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage)
//     } else {
// 		weather.getTemperature(results.lat, results.long, (errorMessage, results) => {
// 		    if (errorMessage) {
// 		        console.log(errorMessage)
// 		    } else {
// 		        console.log(results.lat)
// 		        return results.lat
// 		    }
// 		})
//     }
// })

app.get('/', (request, response) => {
	response.render('home.hbs', {
		title: 'About Page',
		year: new Date().getFullYear(),
		welcome: 'Hello!',
		link1: '/info',
		link2: '/weather',
		name1: 'Info',
		name2: 'Weather'
	});
});

app.get('/info', (request, response) => {
	response.render('about.hbs', {
		title: 'About Page',
		year: new Date().getFullYear(),
		welcome: 'Hello!',
		link1: '/',
		link2: '/weather',
		name1: 'Home',
		name2: 'Weather'
	});
});

app.get('/weather', (request, response) => {
	response.render('weather.hbs', {
		title: 'About Page',
		year: new Date().getFullYear(),
		welcome: 'Hello!',
		link1: '/',
		link2: '/info',
		name1: 'Home',
		name2: 'Info',
		address: 'BCIT'
	})
})

app.get('/404', (request, response) => {
	response.send({
		error: 'Page not found'
	})
})

app.listen(port, () => {
	console.log(`Server is up on the port ${port}`);
});