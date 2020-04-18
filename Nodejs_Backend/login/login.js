const express = require('express')
const sql = require('mssql/msnodesqlv8')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dbConfigConnection = require('../connectToSql')
const router = express.Router()


router.post('/login',(req,res)=>{
    const main = async () => {
  
        const pool = await dbConfigConnection.poolConnect;
    
        const request = new sql.Request(pool);

        const queryCheckExistEmail = `USE Memomi 
        set nocount on;
        SELECT * FROM [TBL_USER] WHERE EMAIL = '${req.body.email}'`
    
        const result = await request.query(queryCheckExistEmail);

        if (result['recordset'].length !== 0){
          const queryCheckPwd = `USE Memomi 
          set nocount on;
          SELECT PASSWORD FROM [TBL_USER] WHERE EMAIL = '${req.body.email}'`

          const pwd = await request.query(queryCheckPwd)

          const hashPwd = pwd['recordset'][0]['PASSWORD'] 

          await bcrypt.compare(req.body.password,hashPwd).then((resultComparison)=>{
            if(resultComparison){
              jwt.sign({ user: req.body.email }, 'secretKey', { expiresIn: '60s' }, function (err, token){res.json({ token, message: 'succeed' })})
            }else{
              res.send('Bad password')
            }
          })

        }
        else{
          res.send('Email doesn\'t found')
        }     
      };
      main()
})
module.exports = router;