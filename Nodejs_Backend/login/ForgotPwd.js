const express = require('express')
const sql = require('mssql/msnodesqlv8')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const dbConfigConnection = require('../connectToSql')
let ejs = require('ejs')
const router = express.Router()

router.post('/ForgotPwd', (req, res) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'app.memomi@gmail.com',
      pass: 'Za021166'
    }  
  })


  ejs.renderFile(__dirname + "/templateResetPwd.ejs", function (err, data) {
    if (err) {
      console.log(err)
    } else {
      const mailOptions = {
        from: 'app.memomi@gmail.com',
        to: req.body.email,
        subject: 'Link to reset password',
        html: data
      }

      transporter.sendMail(mailOptions, (err, res) => {
        if (err) throw err
        res.status(200).json('email sent')
      })
    }
  })

  // const main = async () => {

  //     const pool = await dbConfigConnection.poolConnect;

  //     const request = new sql.Request(pool);

  //     const queryCheckExistEmail = `USE Memomi 
  //     set nocount on;
  //     SELECT * FROM [TBL_USER] WHERE EMAIL = '${req.body.email}'`

  //     const result = await request.query(queryCheckExistEmail);

  //     if (result['recordset'].length !== 0){
  //         res.json('succeed')
  //     }
  //     else{
  //       res.json('Email doesn\'t found')
  //     }     
  //   };
  //   main()
})


module.exports = router;