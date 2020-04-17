const express = require('express')
const sql = require('mssql/msnodesqlv8')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dbConfigConnection = require('../connectToSql')
const verifyToken = require('./checkToken')
const router = express.Router()


router.post('/signUp', (req, res) => {

  const main = async () => {

    const pool = await dbConfigConnection.poolConnect;

    const request = new sql.Request(pool);

    const queryCheckExistEmail = `USE Memomi 
    set nocount on;
    SELECT * FROM [TBL_USER] WHERE EMAIL = '${req.body.email}'`

    const result = await request.query(queryCheckExistEmail);

    if (result['recordset'].length !== 0) {
      res.json("email exists")
    }
    else {

      function hashPwd() {
        return new Promise((resolve, reject) => {
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
              resolve(hash)
            })
          });
        })
      }
      
      const newHashPwd = await hashPwd()

      const queryInsertDataSignUp = `USE Memomi
      INSERT INTO dbo.[TBL_USER] (EMAIL,PASSWORD,YEAR_OF_BIRTH)
      VALUES ('${req.body.email}','${newHashPwd}',${req.body.year_birth})`;

      await request.query(queryInsertDataSignUp).then(() => {
        jwt.sign({ user: req.body.email }, 'secretKey', { expiresIn: '60s' }, function (err, token) {
          res.json({ token, message: 'Vous etes inscrit' })
        })
      });
    }
  }
  main()
})

router.get('/test', verifyToken, function (req, res) {
  jwt.verify(req.token, 'secretKey', function (err, authData) {
    if (err) {
      res.sendStatus(403)
    }
    else {
      res.status(200).send('succeed');
    }
  })

})

module.exports = router;