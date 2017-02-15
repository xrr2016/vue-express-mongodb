const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')

// 查询所有电影
router.get('/movies', (req, res) => {
  Movie.find({})
    .then(movies => {
      res.json(movies)
    })
    .catch(err => {
      res.json(err)
    })
})
// 查询单个电影
router.get('/movies/:id', (req, res) => {
  Movie.findOne({
      _id: req.params.id
    })
    .then(movie => {
      res.json(movie)
    })
    .catch(err => {
      res.json(err)
    })
})
// 添加一部电影
router.post('/movie', (req, res) => {
  //使用Movie model上的create方法储存数据
  Movie.create(req.body, (err, movie) => {
    if (err) {
      res.json(err)
    } else {
      res.json(movie)
    }
  })
  //使用实例的save方法存储数据
  // let movie = new Movie({
  //   title : req.body.title,
  //   year : req.body.year,
  //   poster : req.body.poster,
  //   introduction : req.body.introduction
  // })
  // movie.save( (err,movie) => {
  //   if (err) {
  //     res.json(err)
  //   } else {
  //     res.json(movie)
  //   }
  // })
})

module.exports = router
