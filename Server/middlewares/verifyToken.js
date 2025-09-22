const JWT = require('jsonwebtoken');
const { SUCCESS, FAIL, ERROR } = require("../middlewares/requestHandler");
const handle =require('../middlewares/responseHandler');
const verifyToken = (req,res,next)=>{
    try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return handle(res, 401, FAIL, "authorization header is required");
    const parts = authHeader.split(' ');
    const token = parts.length === 2 ? parts[1] : null;
    if (!token) return handle(res, 401, FAIL, "token is required");

    const verify = JWT.verify(token, process.env.JWT_SECRET_KEY);
         req.currentUser=verify
    if (!verify) return handle(res, 401, FAIL, "invalid token");
         next();
    } catch (error) {
        return handle(res, 401, ERROR, error.message);
        
    }


}


module.exports = verifyToken;