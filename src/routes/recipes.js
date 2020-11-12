const router = require('express').Router()

const { addRecipes, updateRecipes, getRecipes, deleteRecipes } = require('../controllers/recipes')

router.route('/').get(getRecipes).post(addRecipes)

router.route('/:id').put(updateRecipes).delete(deleteRecipes)

module.exports = router
