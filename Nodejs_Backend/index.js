const express = require('express')
const bodyParser = require("body-parser")
// const sql = require('mssql')
const sql = require("msnodesqlv8")
// const dbConfig = require('./connectToSql')
const app = express()


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = "server=.;Database=Memomi;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";


app.post('/hava', function (req, res) {
  const query = `USE Memomi
  INSERT INTO dbo.[USER] (EMAIL,PASSWORD,USERNAME,YEAR_OF_BIRTH)
  VALUES ('${req.body.email}',${req.body.password},'${req.body.username}',${req.body.year_birth})`;
  console.log(query)
  sql.query(connection, query, (err, rows) => {
    if (err) console.log(err)
    console.log(rows);
  });
  res.json('hello world')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})