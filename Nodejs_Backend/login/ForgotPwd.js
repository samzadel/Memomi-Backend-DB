const express = require('express')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const dbConfigConnection = require('../connectToSql')
let ejs = require('ejs')
const router = express.Router()

router.post('/ForgotPwd', (req, res) => {

  const sendMail = () => {

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

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) throw err
          res.json('succeed')
        })
      }
    })

  }

  const main = async () => {

    const pool = await dbConfigConnection.poolConnect;

    const request = new sql.Request(pool);

    const queryCheckExistEmail = `USE Memomi 
      set nocount on;
      SELECT * FROM [TBL_USER] WHERE EMAIL = '${req.body.email}'`

    const result = await request.query(queryCheckExistEmail);

    if (result['recordset'].length !== 0) {
      sendMail()
    }
    else {
      res.json('Email doesn\'t found')
    }
  };
  main()
})


router.post('/resetPwd',(req,res)=>{

  console.log(req.body)

  const main = async () =>{

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

    const pool = await dbConfigConnection.poolConnect;

    const request = new sql.Request(pool);

    const queryChangePwd = `Use Memomi
    set nocount on;
    UPDATE TBL_USER SET PASSWORD = '${newHashPwd}' WHERE EMAIL = '${req.body.email}'`

    const result = await request.query(queryChangePwd);

  }
  main()


  

})


module.exports = router;