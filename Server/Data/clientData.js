const mongoose = require("mongoose");
const validate = require("validator");
const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  token: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    validate: [validate.isEmail, "please enter valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    default: "Client",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Client", schema);
