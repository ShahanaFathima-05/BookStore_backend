// const jwt=require('jsonwebtoken')

// const jwtMiddleware=(req,res,next)=>{
//     try{
//         console.log("inside the middleware")
//         const token = req.headers.authorization.split(" ")[1]
//         const verification=jwt.verify(token,process.env.secretkey)
//         console.log("verified:", verification)
//         req.payload=verification
//         next()
//     }
//     catch(err){
//         console.log(err.message)
//         res.status(401).json({msg:"Invalid or missing token", error:err.message})
//     }
// }

// module.exports=jwtMiddleware




const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  try {
    console.log('Inside JWT middleware');

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        msg: 'Authorization header is missing'
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        msg: 'Token is missing'
      });
    }

    const verification = jwt.verify(
      token,
      process.env.secretkey
    );

    console.log('Verified token:', verification);

    if (!verification.userid) {
      return res.status(401).json({
        msg: 'User ID is missing from token',
        payload: verification
      });
    }

    req.payload = verification;
    next();

  } catch (err) {
    console.log('JWT error:', err.message);

    return res.status(401).json({
      msg: 'Invalid or missing token',
      error: err.message
    });
  }
};

module.exports = jwtMiddleware;
