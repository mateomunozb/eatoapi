const { Ingredient } = require('../database/db')
const { Product } = require('../database/db')
const { Recipe } = require('../database/db')
const mongoose = require('mongoose')

module.exports = {
  getIngredients: async (req, res) => {
    const { id } = req.params
    try {
      const recipe = await Recipe.findOne({ _id: id })
      if (!recipe) return res.status(400).json({ error: 'Recipe does not exist' })
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
      const recipe = await Recipe.findOne({ _id: id })
      if (!recipe) return res.status(400).json({ error: 'Recipe does not exist' })
      const product = await Product.findOne({ name: productName }, { _id: 0 })
      if (!product) return res.status(400).json({ error: 'Product does not exist' })
      const ingredient = new Ingredient({
        product,
        amount,
      })
      const cost = recipe.cost + product.cost * amount
      const addIngredient = await Recipe.updateOne(
        { _id: id },
        { $push: { ingredients: ingredient }, cost }
      )
      res.json({ message: 'Added ingredient' })
    } catch (error) {
      res.status(400).json(error)
    }
  },

  updateIngredient: async (req, res) => {
    const { id, ingredientId } = req.params
    const { amount } = req.body
    if (!amount) return res.status(400).json({ error: 'Invalid data' })

    try {
      const recipe = await Recipe.findOne({ _id: id })
      if (!recipe) return res.status(400).json({ error: 'Recipe does not exist' })

      const cost = recipe.ingredients.map((ingredient) => {
        const id = String(ingredient._id)
        if (id === ingredientId) {
          return (
            recipe.cost -
            ingredient.product.cost * ingredient.amount +
            ingredient.product.cost * amount
          )
        }
      })

      const updateIngredient = await Recipe.updateOne(
        { _id: id, 'ingredients._id': mongoose.Types.ObjectId(ingredientId) },
        { $set: { 'ingredients.$.amount': amount }, cost: cost[0] }
      )
      console.log('TLC: updateIngredient', updateIngredient)
      res.json({ message: 'Modified ingredient' })
    } catch (error) {
      res.status(400).json(error)
    }
  },

  deleteIngredient: async (req, res) => {
    const { id, ingredientId } = req.params
    try {
      const recipe = await Recipe.findOne({ _id: id })
      if (!recipe) return res.status(400).json({ error: 'Recipe does not exist' })

      const cost = recipe.ingredients.map((ingredient) => {
        const id = String(ingredient._id)
        if (id === ingredientId) {
          return recipe.cost - ingredient.product.cost * ingredient.amount
        }
      })

      const deleteIngredient = await Recipe.findByIdAndUpdate(
        { _id: id },
        { $pull: { ingredients: { _id: mongoose.Types.ObjectId(ingredientId) } }, cost: cost[0] }
      )

      res.json({ message: 'Delete ingredient' })
    } catch (error) {
      res.status(400).json(error)
    }
  },
}
