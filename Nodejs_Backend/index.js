
const express = require('express')
var bodyParser = require("body-parser");
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/hava', function (req, res) {
  res.json('hello world')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})