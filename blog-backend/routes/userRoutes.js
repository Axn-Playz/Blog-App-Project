const express  = require("express");
const { getAllUser, registerController, loginController } = require("../controllers/userController");

// router object
const router = express.Router();

// POST Method for register
router.post("/register",registerController);

// GET Method for user infos
router.get("/all-users",getAllUser);

// POST Method for login
router.post("/login",loginController);

module.exports = router;