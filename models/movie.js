const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const movieSchema = mongoose.Schema({
  name : { type:String, required:true },
  year : String,
  score : Number,
  introduction : String,
  created_at : { type : Date, default : Date.now }
})

const Movie = module.exports = mongoose.model('Movie',movieSchema)

const addMovie = function(movie,cb){
  Movie.create(movie,cb)
}

const updateMovie = function(id,movie,options,cb){
  const query = {_id : id}
  const update = {
    name : movie.name,
    year : movie.year,
    score : movie.score,
    introduction : movie.introduction,
  }
  Movie.findOneAndUpdate(query,update,options,cb)
}

const deleteMovie = function(id){
  const query = { _id : id}
  Movie.findByid(query,cb)
}

const getMovieById = function(id,cb){
  Movie.findById(id,cb)
}

const getMovies = function(cb,limit) {
  Movie.find(cb).limit(limit)
}

module.exports = {
  addMovie,
  getMovies,
  updateMovie,
  getMovieById
}
