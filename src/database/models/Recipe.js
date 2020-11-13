const { Schema } = require('mongoose')

const recipeSchema = Schema({
  id: {
    type: Number,
    require: true,
  },
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
