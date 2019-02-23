const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const OrderSchema = new Schema({
  _id: Number,
  when_created: Date, // дата создания
  who_created: Number, // кто создал
  customer: Number, // id заказчика
  stage: Number, // текущий этап
  documents: [Number],
  responsibles: [Number], // список id со-ков, которые отвест. за этот заказ,
  planings: [Number], // список id планингов по этому заказу
  tasks: [Number], // связанные задачи с заказом
  orderitems: [Number],
  when_edit: Date,
  who_edit: Number,
  deleted: Boolean,
  when_deleted: Date,
  who_deleted: Number,
  comments: [
    {
      text: String,
      date: Date,
      author: Number
    }
  ]
});

module.exports = Order = mongoose.model("orders", OrderSchema);
