const express = require("express");
const userController = require("../Controllers/useController");
const router = new express.Router();
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const multerMiddleware=require('../Middlewares/multerMiddlware')
const bookController=require('../Controllers/bookController')
const adminMiddleware=require('../Middlewares/adminMiddleware')

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

router.get('/latestbooks',bookController.latestBooks)

router.get('/booklist',jwtMiddleware,bookController.booklist)

router.get('/userbooks',jwtMiddleware,bookController.userAddedBook)

router.delete('/deletebook/:bid',jwtMiddleware,bookController.deleteAddedBook)

router.get('/purchasedbooks',jwtMiddleware,bookController.purchasedBookList)

router.get('/bookdetail/:bid',jwtMiddleware,bookController.getBookById)

router.post('/generate-summary',jwtMiddleware,bookController.generateBookSummary)

router.get('/payment/:bid',bookController.bookPayment)

router.get('/admin/allbooks',adminMiddleware,bookController.getAdminAllbooks)

router.get('/admin/approvebook/:bid',adminMiddleware,bookController.approveBook)

router.get('/admin/allusers',adminMiddleware,userController.allUsers)

router.put("/adminupdate",adminMiddleware,multerMiddleware.single('picture'), userController.adminProfileupdate)


module.exports = router