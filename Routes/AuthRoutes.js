const { register, login } = require("../Controllers/AuthControllers");
const { checkUser } = require("../Middlewares/authMiddleware");


const router = require("express").Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);
// router.get("/read", read);
// router.post("/addTask", addTask);
// router.put("/update", updateTask);
// router.delete("/delete/:id", removeTask);

module.exports = router;