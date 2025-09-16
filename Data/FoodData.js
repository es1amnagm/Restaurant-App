const mongoose =require("mongoose");
const schema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  recipe: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: Number,
  },
  category:{
    type : String,
    required:true
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports=mongoose.model("Food",schema);