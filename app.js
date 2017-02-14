const pkg = require('./package')
const config = require('./config/db')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Movie = require('./models/movie')
mongoose.connect(config.mongodb)

const app = express()
const db = mongoose.connection
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res, next) => {
  res.send('hello express')
})
// R
app.get('/api/movies', (req, res, next) => {
  Movie.getMovies((err, movies) => {
    if (err) {
      throw err
    }
    res.json(movies)
    next()
  })
})
// R
app.get('/api/movies/:id', (req, res, next) => {
  const id = req.params._id
  Movie.getMovieById(_id, (err, movie) => {
    if (err) throw err
    res.json(movie)
    next()
  })
})
// C
app.post('/api/movies', (req, res, next) => {
  const movie = req.body
  Movie.addMovie(movie,(err,movie) => {
    if (err) { throw err }
    res.json(movie)
    next()
  })
})
// U
app.put('/api/movies/:_id', (req, res, next) => {
  const id = req.params._id
  const movie = req.body
  Movie.updateMovie(id,movie,{},(err,movie) => {
    if (err) { throw err }
    res.json(movie)
    next()
  })
})
// D
app.delete('/api/movies/:_id',(req,res,next) => {
  const id = req.params._id
  Movie.deleteMovie(id,(err,movie) => {
    if (err) { throw err }
    res.json(movie)
    next()
  })
})

app.listen(port, () => {
  console.log(`${pkg.name} listening on port ${port}`)
})
