const express = require('express')
const bodyParser = require('body-parser')
const pug = require('pug')
const path = require('path')
const urly = require('./urly.js')

const app = express()

// Configs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Store url's in memory for now
let url_short = {}

// Routes
app.get('/', (req, res) => {
	res.render('index')
})

app.post('/', (req, res) => {
	const hash = urly.shorten(req.body._url)
	url_short[hash] = req.body._url
	res.send('your shortened url is: localhost:8080/' + hash)
})

app.get('/:short_id', (req, res) => {
	if (url_short[req.params.short_id])
		res.redirect(url_short[req.params.short_id])
	else
		res.send('does not exist')
})

app.listen(8080, () => {
	console.log('Listening on port 8080')
})
