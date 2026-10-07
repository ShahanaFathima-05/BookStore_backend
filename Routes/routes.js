const express = require("express");
const userController = require("../Controllers/useController");
const router = new express.Router();
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const multerMiddleware=require('../Middlewares/multerMiddlware')

//registration
router.post("/register", userController.useRegister)

//login
router.post("/login", userController.userLogin)

//googleauth
router.post('/googlelogin',userController.googleLogin)

//profile update
router.put("/update",jwtMiddleware,multerMiddleware.single('picture'), userController.userUpadate)

module.exports = router