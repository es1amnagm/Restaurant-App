const bcrypt = require("bcrypt");
const handle = require("../middlewares/responseHandler");
const { SUCCESS, FAIL, ERROR } = require("../middlewares/requestHandler");
const Worker = require("../Data/workersData");
const Client = require("../Data/clientData");
const generateJWT = require("../middlewares/generateJWT");
const signIn = async (req, res) => {
  try {
    const roleRedirects = {
      Manager: "/manager",
      Chef: "/chef",
      Receptionist: "/receptionist",
      Delivery: "/delivery",
      Client: "/client",
    };

    const { email, password } = req.body;

    if (!email) return handle(res, 400, FAIL, "please enter your email");
    else if (!password)
      return handle(res, 400, FAIL, "please enter your password");

    const worker = await Worker.findOne({ email: email });
    const client = await Client.findOne({ email: email });

    if (!worker && !client)
      return handle(res, 401, FAIL, "sorry ! user not found");

    const comparePassword = await bcrypt.compare(worker.password, password);
    console.log(comparePassword);

    if (!comparePassword) return handle(res, 401, FAIL, "wrong password");

    const token = await generateJWT({ _id, name, email, position }, "12h");
    worker.token = token;
    await worker.save();

    const position =
      roleRedirects[worker.position] || roleRedirects[client.position];

    if (position)
      return handle(res, 200, SUCCESS, {
        message: "Login successful",
        role: worker.position,
        redirectTo: position,
      });
    else return handle(res, 403, FAIL, "Unauthorized role");
    
  } catch (error) {  
    return handle(res, 500, ERROR, error.message);
  }   
};

module.exports = signIn;
