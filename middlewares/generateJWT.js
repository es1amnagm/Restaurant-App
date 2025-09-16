const JWT = require('jsonwebtoken');
const generate = (payload, expiresIn)=>{
    return JWT.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: expiresIn,
    });
}


module.exports = generate;