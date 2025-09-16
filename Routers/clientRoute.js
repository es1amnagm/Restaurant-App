const { userPage } = require("../Controllers/Client/clientController");
const express = require("express");
const orderOperations = require("../Controllers/Client/OrderOperations");
const router = express.Router();

router.route("/").get(userPage);

router
  .route("/makeOrder")
  .post(orderOperations.createOrder)
  router.route('/makeOrder/:orderId').delete(orderOperations.cancelOrder);

module.exports = router;
