const jwt=require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    try{
        console.log("inside the middleware")
        const token = req.headers.authorization.split(" ")[1]
        const verification=jwt.verify(token,process.env.secretkey)
        console.log("verified:", verification)
        req.payload=verification
        next()
    }
    catch(err){
        console.log(err.message)
        res.status(401).json({msg:"Invalid or missing token", error:err.message})
    }
}

module.exports=jwtMiddleware