const mongoose = require("mongoose");
const Float = require("mongoose-float").loadType(mongoose, 4);

const Schema = mongoose.Schema;

// Create Schema
const StoreItemSchema = new Schema({
  _id: Number,
  vendor_code: String,
  name: String,
  group: String,
  mesure: String,
  texture: String,
  quantity: Float,
  price: Float,
  loss: Float,
  is_active: Boolean,
  about: String
});

module.exports = StoreItem = mongoose.model("store", StoreItemSchema);
