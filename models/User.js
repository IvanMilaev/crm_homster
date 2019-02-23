const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
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
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  picture: String,
  phone: String,
  alt_phones: [String],
  position: Number,
  birth: Date,
  passport: String,
  driver_lic: String,
  address: String,
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
  comments: [
    {
      text: String,
      date: Date,
      author: Number
    }
  ],
  when_created: {
    type: Date,
    default: Date.now
  },
  who_create: Number
});
module.exports = User = mongoose.model("users", UserSchema);
