const router = require('express').Router()

const { addProducts, getProducts } = require('../controllers/products')

router.route('/').get(getProducts).post(addProducts)

module.exports = router
