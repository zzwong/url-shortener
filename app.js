const express = require('express')
	,bodyParser = require('body-parser')
	,pug = require('pug')
	,path = require('path')
	,urly = require('./urly.js')
	,router = express.Router()

const app = express()

// Configs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Store url's in memory for now
let url_short = {}

// Routes
router.route('/')
	.get((req, res) => { res.render('index')})
	.post((req, res) => {
		const hash = urly.shorten(req.body._url)
		url_short[hash] = req.body._url
		res.render('urly', {
			hash: hash
		})
		// res.send(`your shortened url is: <a href="localhost:8080/${hash}">localhost:8080/${hash}</a>`)
	})



app.get('/:short_id', (req, res) => {
	if (url_short[req.params.short_id])
		res.redirect(url_short[req.params.short_id])
	else
		res.send('does not exist')
})
app.use(router)


app.listen(8080, () => {
	console.log('Listening on port 8080')
})
