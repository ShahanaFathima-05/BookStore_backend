const express = require("express");
const userController = require("../Controllers/useController");
const router = new express.Router();
const jwtMiddleware=require('../Middlewares/jwtMiddleware')

//registration
router.post("/register", userController.useRegister)

//login
router.post("/login", userController.userLogin)

//profile update
router.get("/update",jwtMiddleware, userController.userUpadate)

module.exports = router