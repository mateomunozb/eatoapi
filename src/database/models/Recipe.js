const { Schema } = require('mongoose')

const recipeSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  ingredients: [{}],
  method: {
    type: String,
    require: false,
  },
  cost: {
    type: Number,
    require: false,
  },
})

module.exports = recipeSchema
