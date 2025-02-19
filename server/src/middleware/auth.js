
const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    try{
        const token= req.headers['authorization']?.split(' ')[1]
        if (!token) {
            res.status(403).send({ message: "Access token required" });
            return;
          }     
         const verfied=jwt.verify(token,'book')
         req.userId = verfied.id
         next()
        
    }catch(err){
        res.status(401).json(err.message);
        
    }
}

module.exports= auth