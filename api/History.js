
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const HistorySchema = new Schema({
  icon: String,
  city_name: String,
  country_name: String,
  main_text: String,
  description: String,
  temparature: Number,
  pressure: Number,
  humidity: Number
})

const History = mongoose.model('History', HistorySchema)

module.exports = History