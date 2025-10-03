const signIn = require("../Controllers/Client/signIn");
const router = require("express").Router();
const orderOperations = require("../Controllers/Client/OrderOperations");
const clientController = require("../Controllers/Client/clientController");
const register = require('../Controllers/Client/register');

router.route("/register").post(register);

router.route("/login").post(signIn.NormalSignIn);
router.route("/client-google-signin").get(signIn.signInWithGoogle);
router.route("/google-callback").get(signIn.googleCallback);

router.route("/makeOrder").post(orderOperations.createOrder);
router.route("/makeOrder/:orderId").delete(orderOperations.cancelOrder);

module.exports = router;
