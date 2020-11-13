const router = require('express').Router()

const { addIngredient, getIngredients } = require('../controllers/ingredients')

router.route('/:id/ingredients/').get(getIngredients).post(addIngredient)

module.exports = router
