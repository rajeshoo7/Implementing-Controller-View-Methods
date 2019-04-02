const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
  _Accountid: { type: String, required: true },
  Accounttype: { type: String, required: true, unique: true },
  AccountNumber: { type: Number, required: true, default: '0' },
  Amount: { type: String, required: true, default: '0' },
  AvailbleBalance: { type: Number, required: true, default: '0' },
  Categeory:{ type: String, required: true, default: 'xxx'}
})
module.exports = mongoose.model('Transaction', TransactionSchema)