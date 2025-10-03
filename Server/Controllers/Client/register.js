const Client = require("../../Data/clientData");
const bcrypt = require("bcrypt");
const generateJWT = require("../../middlewares/generateJWT");
const handle = require("../../middlewares/responseHandler");
const { SUCCESS, FAIL, ERROR } = require("../../middlewares/requestHandler");
const asyncHandler = require("../../middlewares/asyncHandler");
const generateError = require("../../middlewares/generateError");


const register = asyncHandler(async (req, res) => {
  const { name, address, phone, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = generateJWT({ name, address, email, phone }, "12h");
  const newClient = await new Client({
    name,
    address,
    phone,
    email,
    password: hashedPassword,
    token,
  });
  await newClient.save();
  return handle(res, 201, SUCCESS, newClient);
});

module.exports = { register };
