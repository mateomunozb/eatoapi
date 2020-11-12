const Joi = require('joi')

const schemaRecipe = Joi.object({
  name: Joi.string().required().messages({
    'string.base': `El nombre debe ser texto`,
    'string.empty': `Nombre de receta requerido`,
    'any.required': `Nombre de receta requerido`,
  }),
  ingredients: Joi.array()
    .items(
      Joi.object({
        ingredient: Joi.string().required().messages({
          'string.empty': `Ingrediente requerido`,
          'any.required': `Ingrediente requerido`,
        }),
        cost: Joi.number().required().messages({
          'string.empty': `Costo de ingrediente requerida`,
          'any.required': `Costo de ingrediente requerida`,
        }),
      }).messages({
        'object.base': `Cada ingrediente debe ser un arreglo con el ingrediente, la cantidad, las unidades y el costo`,
      })
    )
    .messages({
      'array.base': `Los ingredientes deben ser un arreglo`,
    }),
  method: Joi.string().required().messages({
    'string.empty': `Preparacion es requerido`,
    'any.required': `Preparacion es requerido`,
  }),
})

module.exports = { schemaRecipe }
