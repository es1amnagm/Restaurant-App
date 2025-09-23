const mongoose = require('mongoose');
const schema = mongoose.Schema({
  content: [
    {
      type: String,
      required: true,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  delivery: {
    type: Boolean
  },
  takeAway: {
    type: Boolean
  },
  complete: {
    type: Boolean
  },
  createdAt: { type: Date, default: Date.now },

  timeToReceive: {
    type: Date,
  },
});

module.exports = mongoose.model("Order",schema);