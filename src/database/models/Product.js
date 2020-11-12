const { Schema } = require('mongoose')

const productSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  unit: {
    type: String,
    require: true,
  },
  cost: {
    type: Number,
    require: true,
  },
})

module.exports = productSchema
