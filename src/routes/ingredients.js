const router = require('express').Router()

const { addIngredient, getIngredients, deleteIngredient } = require('../controllers/ingredients')

router.route('/:id/ingredients/').get(getIngredients).post(addIngredient)
router.route('/:id/ingredients/:ingredientId').delete(deleteIngredient)

module.exports = router
