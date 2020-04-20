const express = require('express')
const sql = require('mssql/msnodesqlv8')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
//const  hbs = require('nodemailer-express-handlebars')
const dbConfigConnection = require('../connectToSql')
const router = express.Router()


 router.post('/ForgotPwd',(req,res)=>{
//   email = process.env.MAILER_EMAIL_ID || 'app.memomi@gmail.com',
//   pass = process.env.MAILER_PASSWORD || 'Za021166'
//   nodemailer = require('nodemailer');

// var smtpTransport = nodemailer.createTransport({
//   service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
//   auth: {
//     user: email,
//     pass: pass}
// });

// var handlebarsOptions = {
//   viewEngine: 'handlebars',
//   viewPath: path.resolve('./api/templates/'),
//   extName: '.html'
// };
// smtpTransport.use('compile', hbs(handlebarsOptions));
    const main = async () => {
  
        const pool = await dbConfigConnection.poolConnect;
    
        const request = new sql.Request(pool);

        const queryCheckExistEmail = `USE Memomi 
        set nocount on;
        SELECT * FROM [TBL_USER] WHERE EMAIL = '${req.body.email}'`
    
        const result = await request.query(queryCheckExistEmail);

        if (result['recordset'].length !== 0){
            res.json('succeed')
        }
        else{
          res.json('Email doesn\'t found')
        }     
      };
      main()
})
module.exports = router;