const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const UserModel = require("../models/user.model");

// auth
router.post("/register", authController.signUp);

// user DB Edit-Update-Delete user
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.userUpdate);
router.delete("/:id", userController.userDelete);

module.exports = router;
