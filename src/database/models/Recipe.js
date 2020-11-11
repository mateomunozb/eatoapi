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
        text: {
          type: String,
          require: true,
        },
        amout: {
          type: Number,
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
      },
    ],
  },
  method: {
    type: String,
    require: true,
  },
  cost: {
    type: Number,
    require: true,
  },
})

module.exports = recipeSchema
