const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TaskSchema = new Schema({
  _id: Number,
  type: String, // тип задачи - классификация настраиваемая (task_types)
  start: Date, // начало выполнения задачи
  end: Date, // дедлайн для задачи
  order: Number, // связанный заказ если задача по заказу
  responsibles: [Number], // ответственные за задачу - от 1
  header: String,
  description: String, // описание задачи
  need_controller: Boolean, // требует ли контроля выполнения
  controller: Number, // контролер (если требуется)
  is_accepted: Boolean, // принято ли выполнение контролером
  when_closed: Date,
  who_closed: Number,
  when_accepted: Date,
  when_created: Date, // дата создания
  who_created: Number, // кто создал
  when_edit: Date,
  who_edit: Number,
  is_active: Boolean,
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

module.exports = Task = mongoose.model("tasks", TaskSchema);
