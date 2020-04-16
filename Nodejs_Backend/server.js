var express = require('express');
var app = express();
var signUp = require('./signUp/signUp')
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', signUp);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })