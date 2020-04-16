const express = require('express')
const sql = require('mssql/msnodesqlv8')
const jwt = require('jsonwebtoken')
const dbConfigConnection = require('../connectToSql')
const router = express.Router()


router.post('/login',(req,res)=>{
    const main = async () => {
  
        const pool = await dbConfigConnection.poolConnect;
    
        const request = new sql.Request(pool);

        const queryCheckExistUser = `USE Memomi 
        set nocount on;
        SELECT * FROM [USER] WHERE EMAIL = '${req.body.email}' AND PASSWORD='${req.body.password}'`
    
        const result = await request.query(queryCheckExistUser);

        if (result['recordset'].length !== 0){
          jwt.sign({ user: req.body.email }, 'secretKey', { expiresIn: '60s' }, function (err, token){res.json({ token, message: 'succeed' }) })
        }
        else {res.json("email or password is invalid")};      

      };
      main()
})
module.exports = router;