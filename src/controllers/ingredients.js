const { Ingredient } = require('../database/db')
const { Product } = require('../database/db')
const { Recipe } = require('../database/db')

module.exports = {
  getIngredients: async (req, res) => {
    const { id } = req.params
    try {
      const recipe = await Recipe.findOne({ id })
      const allIngredients = recipe.ingredients
      res.json({ allIngredients })
    } catch (error) {
      res.status(400).json(error)
    }
  },
  addIngredient: async (req, res) => {
    const { id } = req.params
    const { productName, amount } = req.body

    if (!productName) {
      return res.status(400).json({ error: 'Product name required' })
    } else if (!amount) {
      return res.status(400).json({ error: 'Amount required' })
    }

    try {
      const recipe = await Recipe.findOne({ id })
      const product = await Product.findOne({ name: productName }, { _id: 0 })
      if (!product) return res.status(400).json({ error: 'Product does not exist' })
      const ingredient = new Ingredient({
        id: recipe.ingredients.length + 1,
        product,
        amount,
      })
      const cost = recipe.cost + product.cost * amount
      console.log('TLC: cost', cost)
      const addIngredient = await Recipe.updateOne(
        { id },
        { $push: { ingredients: ingredient }, cost }
      )
      res.json({ message: 'added ingredient' })
    } catch (error) {
      res.status(400).json(error)
    }
  },
}