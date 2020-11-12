const router = require('express').Router()

const { addRecipes } = require('../controllers/recipes')

router.route('/').post(addRecipes)

module.exports = router
