const jwt=require('jsonwebtoken');
const {jwtKey}=require('../config/jwtKey');

// generate jwt tokens and also decode token

function generateToken(user){
    const token=jwt.sign({...user,name:user.displayName},jwtKey,{expiresIn:"1h"});
    return token;
}

function verifyToken(token){
    try{
        const decode=jwt.decode(token,jwtKey);
        return decode;
    }
    catch(err){return err.message}
}

module.exports={generateToken,verifyToken};