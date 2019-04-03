/**
 * @file app.js
 * The starting point of the application.
 * Express allows us to configure our app and use
 * dependency injection to add it to the http server.
 * 
 * The server-side app starts and begins listening for events.
 *
 */

// Module dependencies

const http = require('http')
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const favicon = require('serve-favicon')
const path = require('path')
const bodyParser = require('body-parser')
const engines = require('consolidate')
const errorHandler = require('errorhandler')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const LOG = require('./utils/logger.js')

// Load environment variables from .env file, where port, API keys, and passwords are configured.
// dotenv.load is depricated in dotenv version>6.4.1 
// to check dotenv version in your machine use command "npm dotenv -version"
// If your version is 6.4.1 or below use dotenv.load
// If your version is greater than 6.4.1 use dotenv.config as shown below
dotenv.config({ path: '.env' })

LOG.info('Environment variables loaded into process.env.')

// create express app ..................................
const app = express()

// configure app.settings.............................
app.set('port', process.env.PORT )
app.set('host', process.env.HOST )

// set the root view folder
app.set('views', path.join(__dirname, 'views'))

// specify desired view engine (EJS)
app.set('view engine', 'ejs')
app.engine('ejs', engines.ejs)

// configure middleware.....................................................
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))

// log every call and pass it on for handling
app.use((req, res, next) => {
  LOG.debug(`${req.method} ${ req.url}`)
  next()
})

// specify various resources and apply them to our application
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))
app.use(expressLayouts)
app.use(errorHandler()) // load error handler

const routes = require('./routes/index.js')
app.use('/', routes)  // load routing to handle all requests
LOG.info('Loaded routing.')

app.use((req, res) => { res.status(404).render('404.ejs') }) // handle page not found errors

// initialize data ............................................
require('./utils/seeder.js')(app)  // load seed data by passing in the app

// call app.listen to start server
const port = app.get('port')
const host = app.get('host')
const env = app.get('env')

app.listen(port, host, () => {
  console.log(`\nApp running at http://${host}:${port}/ in ${env} mode`)
  console.log('Press CTRL-C to stop\n')
})

module.exports = app
