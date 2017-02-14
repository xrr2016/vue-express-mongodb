const path = require('path')
const pkg = require('./package')
const express = require('express')
const port = process.env.PORT || 3000

const app = express()


app.get('/',(req,res,next)=>{
  res.send('hello express')
})

app.listen(port, () => {
    console.log(`${pkg.name} listening on port ${port}`)
})
