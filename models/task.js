const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  addedBy: {type: ObjectId, ref: 'users'},
});

const TaskModel = mongoose.model("tasks", TaskSchema);

module.exports = TaskModel;