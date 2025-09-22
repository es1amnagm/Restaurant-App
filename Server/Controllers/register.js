const User = require("../Data/clientData");
const bcrypt = require("bcrypt");
const generateJWT = require("../middlewares/generateJWT");
const handle = require("../middlewares/responseHandler");
const {SUCCESS , FAIL , ERROR } = require("../middlewares/requestHandler");
const register = async (req, res) => {
  const { name, address, phone, email, password } = req.body;
 try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const token = generateJWT({ name, address, email,  phone },'3h');
      const newClient = await new User({
        name,
        address,
        phone,
        email,
        password:hashedPassword,
        token,
      });
      await newClient.save();
    return handle(res, 201, SUCCESS, newClient);

 } catch (error) {
    const isDuplicate = error && error.code === 11000;
    const status = isDuplicate ? 409 : 500;
    return handle(res, status, ERROR, isDuplicate ? "email already exists" : error.message);
 }

};


module.exports  = {register}