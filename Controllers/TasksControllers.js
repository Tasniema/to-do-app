const TaskModel = require('../models/task');

module.exports.read = async  (req, res) => {
  TaskModel.find({ addedBy: req.user._id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
}

module.exports.addTask = async  (req, res) => {
  const task = req.body.task;

  const newTask = new TaskModel({ task: task });
  if(req.user) { newTask.addedBy = req.user._id }

  await newTask.save();
  res.send("inserted data");
}


module.exports.updateTask = async (req, res) => {
  const newTask = req.body.newTask;
  const id = req.body.id;

  try {
     await TaskModel.findById(id, (error, taskToUpdate) => {
        taskToUpdate.task = newTask;
        taskToUpdate.save();
     })
  } catch (err) {
    console.log(err)
  }

  res.send("updated1")
}



module.exports.removeTask = async (req, res) => {
  const id = req.params.id;

  await TaskModel.findByIdAndRemove(id).exec();
  res.send("item deleted!");
}