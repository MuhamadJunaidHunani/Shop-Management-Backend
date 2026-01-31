const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;
