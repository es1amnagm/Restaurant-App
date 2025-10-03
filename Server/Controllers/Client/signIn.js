const bcrypt = require("bcrypt");
const handle = require("../../middlewares/responseHandler");
const { FAIL } = require("../../middlewares/requestHandler");
const Client = require("../../Data/clientData");
const generateJWT = require("../../middlewares/generateJWT");
const { Issuer } = require("openid-client");
const asyncHandler = require("../../middlewares/asyncHandler");

// 1. Discover Google OAuth server config & create client
async function setupClient() {
  const googleIssuer = await Issuer.discover("https://accounts.google.com");
  console.log("Discovered issuer %s", googleIssuer.issuer);

  const client = new googleIssuer.Client({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uris: [process.env.REDIRECT_URIS],
    response_types: ["code"],
  });
  return client;
}

// 2. Sign in route
const signInWithGoogle = async (req, res) => {
  const client = await setupClient();
  if (!client) {
    return res.status(500).send("OAuth client not initialized yet");
  }

  const url = client.authorizationUrl({
    scope: "openid email profile ", // request identity + email + profile
  });

  res.redirect(url);
};

const NormalSignIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) return handle(res, 400, FAIL, "Please enter your email");
  if (!password)
    return next(generateError(400, FAIL, "Please enter your password"));

  const client = await Client.findOne({ email });

  if (!client) return next(generateError(401, FAIL, "User not found"));

  const isPasswordValid = await bcrypt.compare(password, client.password);
  if (!isPasswordValid) return next(generateError(401, FAIL, "Wrong password"));

  const { _id, name, position } = client;
  const token = await generateJWT({ _id, name, email, position }, "12h");

  client.token = token;
  await client.save();

  return res.redirect("/client");
});

const googleCallback = async (req, res) => {
  const client = await setupClient();

  // اجمع الباراميترز من Google
  const params = client.callbackParams(req);

  // تبادل الكود مع التوكينات
  const tokenSet = await client.callback(
    "http://localhost:3000/client",
    params
  );

  // بيانات المستخدم
  const userInfo = tokenSet.claims();

  let foundClient = Client.findOne({ email: userInfo.email });

  if (!foundClient) {
    foundClient = Client.create({
      name: userInfo.name,
      email: userInfo.email,
    });
  }

  const JWT = generateWJT(
    { name: foundClient.name, email: foundClient.email },
    "12h"
  );
  foundClient.JWT = JWT;
  await foundClient.save();

  return res.redirect("/client");
};

module.exports = {
  NormalSignIn,
  setupClient,
  signInWithGoogle,
  googleCallback,
};
