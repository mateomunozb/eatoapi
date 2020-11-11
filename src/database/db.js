require('dotenv').config()

const recipeSchema = require('./models/recipe')

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

module.exports = { Recipe }
