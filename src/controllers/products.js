const { Product } = require('../database/db')
const { schemaProduct } = require('../database/models/Validate')

module.exports = {
  getProducts: async (req, res) => {
    try {
      const allProducts = await Product.find({})
      res.json({ allProducts })
    } catch (error) {
      res.status(400).json(error)
    }
  },

  addProducts: async (req, res) => {
    const { error } = schemaProduct.validate(req.body)

    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, unit, cost } = req.body

    try {
      const productExist = await Product.findOne({ name })
      if (productExist) return res.status(400).json({ error: 'Product alredy exist' })

      const product = new Product({ name, unit, cost })
      const productDB = await product.save()
      res.json({ message: 'Product created', data: productDB })
    } catch (error) {
      res.status(400).json(error)
    }
  },
}
