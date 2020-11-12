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
  ingredients: {
    type: [
      {
        ingredient: {
          type: String,
          require: true,
        },
        cost: {
          type: Number,
          require: true,
        },
      },
    ],
    require: true,
  },
  method: {
    type: String,
    require: true,
  },
})

module.exports = recipeSchema
