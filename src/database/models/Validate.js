const Joi = require('joi')

const schemaRecipe = Joi.object({
  name: Joi.string().required(),
  method: Joi.string().allow('').optional(),
})

const schemaProduct = Joi.object({
  name: Joi.string().required(),
  unit: Joi.string().required(),
  cost: Joi.number().required(),
})

module.exports = { schemaRecipe, schemaProduct }
