const express = require("express");
const userController = require("../Controllers/useController");
const router = new express.Router();
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const multerMiddleware=require('../Middlewares/multerMiddlware')
const bookController=require('../Controllers/bookController')

//registration
router.post("/register", userController.useRegister)

//login
router.post("/login", userController.userLogin)

//googleauth
router.post('/googlelogin',userController.googleLogin)

//profile update
router.put("/update",jwtMiddleware,multerMiddleware.single('picture'), userController.userUpadate)

//add-book
router.post('/addbook',jwtMiddleware,multerMiddleware.array('uploadedImages'),bookController.addBook)

module.exports = router