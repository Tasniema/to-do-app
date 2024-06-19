const { read, addTask, updateTask, removeTask } = require("../Controllers/TasksControllers");
const { checkUser } = require("../Middlewares/authMiddleware");

const router = require("express").Router();


router.get('/read', checkUser,read );
router.post('/addTask',checkUser, addTask);
router.put("/update", checkUser, updateTask);
router.delete("/delete/:id",checkUser ,removeTask);


module.exports = router;