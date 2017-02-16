const axios = require('axios')
const config = require('./config/db')
const mongoose = require('mongoose')
mongoose.connect(config.mongodb)
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  original_title: String,
  rating: Number,
  genres: Array,
  casts: Array,
  directors: Array,
  year: Number,
  id: String,
  image: String
})
const Movie = mongoose.model("Movie", movieSchema)

const jsonBird = "https://bird.ioliu.cn/v1?url="
const doubanMovie = "http://api.douban.com/v2/movie/top250?count="

function fetchData(count) {
  const url = `${jsonBird}${doubanMovie}${count}`
  axios.get(url)
    .then(res => {
      const subjects = res.data.subjects
      subjects.map(subject => {
        let movie = {
          title: subject.title,
          original_title: subject.original_title,
          rating: subject.rating.average,
          genres: subject.genres,
          casts: subject.casts,
          directors: subject.directors,
          year: subject.year,
          id: subject.id,
          image: subject.images.small
        }
        Movie.create(movie, (err, movie) => {
          if (err) { console.log(err) }
          console.log(movie.title, '--------')
        })
      })
    })
    .catch((err) => {
      throw err
    })
}

fetchData(5)
