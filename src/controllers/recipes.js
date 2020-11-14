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
    const { error } = schemaRecipe.validate(req.body)

    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, method } = req.body

    try {
      const recipeExist = await Recipe.findOne({ name })
      if (recipeExist) return res.status(400).json({ error: 'Recipe alredy exist' })

      const recipe = new Recipe({ name, method: method ? method : '', cost: 0 })
      const recipeDB = await recipe.save()
      res.json({ message: 'Recipe created', data: recipeDB })
    } catch (error) {
      res.status(400).json(error)
    }
  },

  updateRecipes: async (req, res) => {
    const { id } = req.params
    const { name, method } = req.body

    try {
      const idExist = await Recipe.findOne({ _id: id })
      if (!idExist) return res.status(400).json({ error: 'Recipe does not exist' })

      if (name || method) {
        if (name) {
          const updateRecipeName = await Recipe.updateOne({ _id: id }, { name })
          res.json({ message: 'Modified recipe' })
        }
        if (method) {
          const updateRecipeMethod = await Recipe.updateOne({ _id: id }, { method })
          res.json({ message: 'Modified recipe' })
        }
      } else {
        return res.status(400).json({ error: 'Invalid data' })
      }
    } catch (error) {
      res.status(400).json(error)
    }
  },

  deleteRecipes: async (req, res) => {
    const { id } = req.params
    try {
      const recipe = await Recipe.findOne({ _id: id })
      if (!recipe) return res.status(400).json({ error: 'Recipe does not exist' })
      const deleteRecipe = await Recipe.deleteOne({ _id: id })
      res.json({ message: 'Recipe removed' })
    } catch (error) {
      res.status(400).json(error)
    }
  },
}
