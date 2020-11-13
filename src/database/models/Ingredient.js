const { Schema } = require('mongoose')

const ingredientSchema = Schema({
  product: {},
  amount: {
    type: Number,
    require: true,
  },
})

module.exports = ingredientSchema
