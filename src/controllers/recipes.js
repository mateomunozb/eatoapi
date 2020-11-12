const { Recipe } = require('../database/db')
const { schemaRecipe } = require('../database/models/Validate')

module.exports = {
  addRecipes: async (req, res) => {
    const allRecipes = await Recipe.find({})

    const { error } = schemaRecipe.validate(req.body)

    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, ingredients, method } = req.body

    if (ingredients.length === 0) {
      return res.status(400).json({ error: 'Ingredients list is empty' })
    }

    const recipeExist = await Recipe.findOne({ name })
    if (recipeExist) return res.status(400).json({ error: 'Recipe alredy exist' })

    const id = allRecipes.length + 1

    const recipe = new Recipe({ id, name, ingredients, method })

    try {
      const recipeDB = await recipe.save()
      res.json({ message: 'Receta creada con éxito', data: recipeDB })
    } catch (error) {
      res.status(400).json(error)
    }
  },
}
