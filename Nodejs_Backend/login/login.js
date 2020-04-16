const express = require('express')
const sql = require('mssql/msnodesqlv8')
const jwt = require('jsonwebtoken')
const dbConfigConnection = require('../connectToSql')
const router = express.Router()


router.get('/login',(req,res)=>{
    
})