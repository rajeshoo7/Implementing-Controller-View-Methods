// set up a temporary (in memory) database
const Datastore = require('nedb')
const LOG = require('../utils/logger.js')

// require each data file

const transaction = require('../data/transaction.json')

// inject the app to seed the data

module.exports = (app) => {
  LOG.info('START seeder.')
  const db = {}

  db.transaction = new Datastore()
  db.transaction.loadDatabase()

  // insert the sample data into our data store
  db.transaction.insert(transaction)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.transaction = db.transaction.find(transaction)
  LOG.debug(`${app.locals.transaction.query.length} transactions seeded`)
  // Customers don't depend on anything else...................

 //done


  LOG.info('END Seeder. Sample data read and verified.')




 





}
