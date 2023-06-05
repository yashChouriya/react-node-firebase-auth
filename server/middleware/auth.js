const { verifyToken } = require("../services/authToken");

// function to get header and authorize the user for CRUD operations

function authUser(req,res,next){
    const token=req.headers['x-auth-token'];
    if(!token){
        return res.send("Unauthorized Access. Required Token to proceed further");
    }
    try{
        const decode=verifyToken(token);
        if(!decode){
            return res.send('Invalid Token')
        }
        req.user=decode;
    }
    catch(err){ return res.send("Invalid Token")}
    return next();
}

module.exports={authUser};





