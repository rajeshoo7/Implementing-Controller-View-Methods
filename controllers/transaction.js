/** 
*  Transaction controller
*  Handles requests related to transactions (see routes)
*
* @author Rajesh Kammari <S534844@nwmissouri.edu>
*
*/
const express = require('express')
const api = express.Router()
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const Model = require('../models/transaction.js')
const notfoundstring = 'Transaction not found'

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const data = req.app.locals.transaction.query
    res.send(JSON.stringify(data))
  })
  
  // GET one JSON by ID
  api.get('/findone/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const id = parseInt(req.params.id)
    const data = req.app.locals.transaction.query
    const item = find(data, { _Accountid: id })
    if (!item) { return res.end(notfoundstring) }
    res.send(JSON.stringify(item))
  })
  
  // RESPOND WITH VIEWS  --------------------------------------------
  
  // GET to this controller base URI (the default)
  api.get('/', (req, res) => {
    res.render('transaction/index.ejs')
  })
  
  // GET create
  api.get('/create', (req, res) => {
    LOG.info(`Handling GET /create${req}`)
    const item = new Model()
    LOG.debug(JSON.stringify(item))
    res.render('transaction/create',
      {
        title: 'Create transaction',
        layout: 'layout.ejs',
        transactions: item
      })
  })
  
  // GET /delete/:id
  api.get('/delete/:id', (req, res) => {
    LOG.info(`Handling GET /delete/:id ${req}`)
    const id = parseInt(req.params.id)
    const data = req.app.locals.transaction.query
    const item = find(data, { _Accountid: id })
    if (!item) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
    return res.render('transaction/delete.ejs',
      {
        title: 'Delete transaction',
        layout: 'layout.ejs',
        transaction: item
      })
  })
  
  // GET /details/:id
  api.get('/details/:id', (req, res) => {
    LOG.info(`Handling GET /details/:id ${req}`)
    const id = parseInt(req.params.id)
    const data = req.app.locals.transaction.query
    const item = find(data, { _Accountid: id })
    if (!item) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
    return res.render('transaction/details.ejs',
      {
        title: 'transaction Details',
        layout: 'layout.ejs',
        transaction: item
      })
  })
  
  // GET one
  api.get('/edit/:id', (req, res) => {
    LOG.info(`Handling GET /edit/:id ${req}`)
    const id = parseInt(req.params.id)
    const data = req.app.locals.transaction.query
    const item = find(data, { _Accountid: id })
    if (!item) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR${JSON.stringify(item)}`)
    return res.render('transaction/edit.ejs',
      {
        title: 'transactions',
        layout: 'layout.ejs',
        transaction: item
      })
  })
  
  // HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------
  
  // POST new
  api.post('/save', (req, res) => {
    LOG.info(`Handling POST ${req}`)
    LOG.debug(JSON.stringify(req.body))
    const data = req.app.locals.transaction.query
    const item = new Model()
    LOG.info(`NEW ID ${req.body._Accountid}`)
    item._Accountid = parseInt(req.body._Accountid)
    item.Acoounttype = req.body.Acoounttype
    item.AccountNumber = req.body.AccountNumber
    item.Amount = req.body.Amount
    item.AvailbleBalance = req.body.AvailbleBalance
    item.Categeory = req.body.Categeory
    data.push(item)
    LOG.info(`SAVING NEW transaction ${JSON.stringify(item)}`)
    return res.redirect('/transaction')
  })
  
  // POST update with id
  api.post('/save/:id', (req, res) => {
    LOG.info(`Handling SAVE request ${req}`)
    const id = parseInt(req.params.id)
    LOG.info(`Handling SAVING ID=${id}`)
    const data = req.app.locals.transaction.query
    const item = find(data, { _Accountid: id })
    if (!item) { return res.end(notfoundstring) }
    LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
    LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
    item.Acoounttype = req.body.Acoounttype
    item.AccountNumber = req.body.AccountNumber
    item.Amount = req.body.Amount
    item.AvailbleBalance = req.body.AvailbleBalance
    item.Categeory = req.body.Categeory
    LOG.info(`SAVING UPDATED transaction ${JSON.stringify(item)}`)
    return res.redirect('/transaction')
  })
  
  // DELETE id (uses HTML5 form method POST)
  api.post('/delete/:id', (req, res) => {
    LOG.info(`Handling DELETE request ${req}`)
    const id = parseInt(req.params.id)
    LOG.info(`Handling REMOVING ID=${id}`)
    const data = req.app.locals.transaction.query
    const item = find(data, { _Accountid: id })
    if (!item) { return res.end(notfoundstring) }
    if (item.isActive) {
      item.isActive = false
      console.log(`Deacctivated item ${JSON.stringify(item)}`)
    } else {
      const item = remove(data, { _id: id })
      console.log(`Permanently deleted item ${JSON.stringify(item)}`)
    }
    return res.redirect('/transaction')
  })
  
  module.exports = api
  