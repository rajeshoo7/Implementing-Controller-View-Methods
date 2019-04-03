/** 
*  Customer model
*  Describes the characteristics of each attribute in a customer resource.
*
* @author Denise Case <dcase@nwmissouri.edu>
*
*/

// see <https://mongoosejs.com/> for more information
const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  given: { type: String, required: true, default: 'Given' },
  family: { type: String, required: true, default: 'Family' },
  accountNumber: { type: String, required: true, default: '' },
  transactionType: { type: String, required: false, default: '' },
  amount: { type: String, required: true, default: '' },
})

module.exports = mongoose.model('Customer', CustomerSchema)
