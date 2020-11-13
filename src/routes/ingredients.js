const router = require('express').Router()

const {
  addIngredient,
  getIngredients,
  updateIngredient,
  deleteIngredient,
} = require('../controllers/ingredients')

router.route('/:id/ingredients/').get(getIngredients).post(addIngredient)
router.route('/:id/ingredients/:ingredientId').put(updateIngredient).delete(deleteIngredient)

module.exports = router
