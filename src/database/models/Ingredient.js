const { Schema } = require('mongoose')

const ingredientSchema = Schema({
  id: {
    type: Number,
    require: true,
  },
  product: {},
  amount: {
    type: Number,
    require: true,
  },
})

module.exports = ingredientSchema
