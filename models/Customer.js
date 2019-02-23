const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CustomerSchema = new Schema({
  _id: Number,
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  is_active: Boolean,
  balance: String,
  picture: String,
  age: Number,
  email: String,
  phone: String,
  alt_phones: [String],
  address: [String],
  company: String,
  comments: [
    {
      text: String,
      date: Date,
      author: Number
    }
  ],
  eye_color: String,
  friends: [
    {
      id: Number,
      name: String
    }
  ],
  greeting: String,
  favorite_fruit: String,
  about: String,
  latitude: String,
  longitude: String,
  tags: [String],
  range: [Number],

  when_created: {
    type: Date,
    default: Date.now
  },
  who_create: Number,
  when_edited: Date,
  who_edited: Number,
  ips: [String],
  orders: [Number]
});
module.exports = Customer = mongoose.model("customers", CustomerSchema);
