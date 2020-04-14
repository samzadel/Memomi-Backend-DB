module.exports = function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader == "undefined"){
        res.sendStatus(403)
        console.log('doesn\'t work')
    }
    else{
        const token = bearerHeader.split(' ')[1]
        req.token = token
        next()
    }
    
}



