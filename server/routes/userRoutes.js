const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getHomePage);
router.get("/new", userController.getNewUserForm);
router.post("/new", userController.createUser);

module.exports = router;