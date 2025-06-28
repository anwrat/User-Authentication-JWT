const jwt = require('jsonwebtoken')

const requireAuth = (req,res,next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(400).json({error:'Authorization token invalid or missing'})
    }
    const token = authHeader.split(' ')[1]

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch(err){
        return res.status(400).json({error:'Invalid or Expired token'})
    }
}
module.exports = requireAuth