const { Schema } = require('mongoose')

const recipeSchema = Schema({
  id: Number,
  name: String,
  ingredients: [
    {
      text: String,
      amout: Number,
      unit: String,
      cost: Number,
    },
  ],
  method: String,
  cost: Number,
})

module.exports = recipeSchema
