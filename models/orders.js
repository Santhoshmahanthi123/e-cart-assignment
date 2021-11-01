const mongoose = require('mongoose')
const { double } = require('webidl-conversions')
const Schema = mongoose.Schema
const oderSchema = new Schema({
  order_id: { type: String, required: true, unique:true },
  item_name:{ type: String, required: true },
  cost:{ type: Number, required: true },
  order_date:{ type: Date, required: true },
  delivery_date:{ type: Date, required: true }
},
{
    timestamps: true
})
module.exports = mongoose.model('Order', oderSchema)