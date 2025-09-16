const mongoose=require('mongoose');
const validate = require('validator');
const schema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
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
  salary: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    enum: ["Manager", "Receptionist", "Delivery", "Chef"],
    required: true,
  },
  token: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    validate:[validate.isEmail,"please enter valid email"],
    unique: true, // 👈 each email should be unique
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports=mongoose.model("Worker",schema);