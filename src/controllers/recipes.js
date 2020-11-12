const { Recipe } = require('../database/db')
const { schemaRecipe } = require('../database/models/Validate')

module.exports = {
  getRecipes: async (req, res) => {
    try {
      const allRecipes = await Recipe.find({})
      res.json({ allRecipes })
    } catch (error) {
      res.status(400).json(error)
    }
  },

  addRecipes: async (req, res) => {
    try {
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

      const recipeDB = await recipe.save()
      res.json({ message: 'Recipe created', data: recipeDB })
    } catch (error) {
      res.status(400).json(error)
    }
  },

  updateRecipes: async (req, res) => {
    const { id } = req.params
    const { name, ingredients, method } = req.body

    try {
      if (name) {
        const updateRecipeName = await Recipe.updateOne({ id }, { name })
        res.json({ message: 'Modified recipe' })
      }

      if (method) {
        const updateRecipeMethod = await Recipe.updateOne({ id }, { method })
        res.json({ message: 'Modified recipe' })
      }
    } catch (error) {
      if (ingredients) res.status(400).json(error)
    }
  },

  deleteRecipes: async (req, res) => {
    const { id } = req.params
    try {
      const deleteRecipe = await Recipe.deleteOne({ id })
      res.json({ message: 'Recipe removed' })
    } catch (error) {
      res.status(400).json(error)
    }
  },
}
