const Joi = require('joi')

const schemaRecipe = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.array().items(
    Joi.object({
      ingredient: Joi.string().required(),
      cost: Joi.number().required(),
    })
  ),
  method: Joi.string().required(),
})

const schemaProduct = Joi.object({
  name: Joi.string().required(),
  unit: Joi.string().required(),
  cost: Joi.number().required(),
})

module.exports = { schemaRecipe, schemaProduct }
