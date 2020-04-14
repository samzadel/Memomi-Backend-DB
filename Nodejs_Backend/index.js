const express = require('express')
const bodyParser = require("body-parser")
const sql = require('mssql/msnodesqlv8')
const jwt = require('jsonwebtoken')
const dbConfig = require('./connectToSql')
const verifyToken = require('./checkToken')
const app = express()


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/hava', (req, res) => {

  const main = async () => {
    const pool = new sql.ConnectionPool({
      server: "LAPTOP-G7A1FT2J",
      database: "Memomi",
      options: {
        trustedConnection: true
      }
    });

    await pool.connect();

    const request = new sql.Request(pool);

    const queryCheckExistEmail = `USE Memomi 
    set nocount on;
    SELECT * FROM [USER] WHERE EMAIL = '${req.body.email}'`

    const result = await request.query(queryCheckExistEmail);

    if (result['recordset'].length !== 0){
      res.json({message: "Cet email exist deja"})
    }
    else{
      const queryInsertDataSignUp = `USE Memomi
      INSERT INTO dbo.[USER] (EMAIL,PASSWORD,YEAR_OF_BIRTH)
      VALUES ('${req.body.email}',${req.body.password},${req.body.year_birth})`;

      const result2 = await request.query(queryInsertDataSignUp).then(()=>{
        jwt.sign({ user: req.body.email }, 'secretKey', { expiresIn: '60s' }, function (err, token) {
              res.json({ token, message: 'Vous etes inscrit' })
            })
      });      
    } 
  }
  main()
})

app.get('/test', verifyToken, function (req, res) {
  jwt.verify(req.token, 'secretKey', function (err, authData) {
    if (err) {
      res.sendStatus(403)
    }
    else {
      res.status(200).send('succeed');
    }
  })

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})