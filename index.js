require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

//Initializations
const app = express()
const PORT = process.env.PORT || 3001
const recipesRoutes = require('./src/routes/recipes')

//Cors
const cors = require('cors')
app.use(cors())

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
app.use('/api/recipes', recipesRoutes)
app.get('/api', (req, res) => {
  res.json({
    estado: true,
    mensaje: 'funcional ',
  })
})

//Server
app.listen(PORT, () => console.log(`Server on port ${PORT}!`))
