const express = require("express");
const userController = require("../Controllers/useController");
const router = new express.Router();

//registration
router.post("/register", userController.useRegister)

//login
router.post("/login", userController.userLogin)

//profile update
router.get("/update", userController.userUpadate)

module.exports = router