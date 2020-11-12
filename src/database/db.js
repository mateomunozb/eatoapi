require('dotenv').config()

const recipeSchema = require('./models/Recipe')
const productSchema = require('./models/Product')

const { model, connect } = require('mongoose')

connect(process.env.URI, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
})
  .then((db) => console.log('DB is connected'))
  .catch((err) => console.error(err))

const Recipe = model('Recipe', recipeSchema)
const Product = model('Product', productSchema)

module.exports = { Recipe, Product }
