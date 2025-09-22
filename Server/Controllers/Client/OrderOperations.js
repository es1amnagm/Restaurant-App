const Order = require("../../Data/orderData");
const { ERROR, SUCCESS } = require("../../middlewares/requestHandler");
const handle = require("../../middlewares/responseHandler");

const createOrder = async (req, res) => {
  try {
    const order = req.body;
    const newOrder = new Order(order);
    await newOrder.save();
    return handle(res, 201, SUCCESS, newOrder);
  } catch (error) {
    return handle(res, 500, ERROR, error.message);
  }
};

const cancelOrder = async(req, res) => {
  try {
    const orderId = req.params.orderId;
    if (!orderId) return handle(res, 400, ERROR, "orderId is required");
    const result = await Order.deleteOne({ _id: orderId });
    if (result.deletedCount === 0) {
      return handle(res, 404, ERROR, "order not found");
    }
    return handle(res, 200, SUCCESS, "order canceled successfully");
  } catch (error) {
    return handle(res, 500, ERROR, error.message);
  }
};

module.exports = { createOrder, cancelOrder };
