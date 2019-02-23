const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ProductSchema = new Schema({
  _id: Number,
  vendor_code: String,
  name: String,
  group: String,
  mesure: String,
  textures: [String],
  see_for_store: Boolean,
  see_for_picker: Boolean,
  is_active: Boolean,
  about: String
});
module.exports = Product = mongoose.model("products", ProductSchema);
