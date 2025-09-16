const express = require("express");
const router = express.Router();

const { deliveryPage } = require("../Controllers/Delivery/deliveryController");

router.route("/").get(deliveryPage);

module.exports = router;
