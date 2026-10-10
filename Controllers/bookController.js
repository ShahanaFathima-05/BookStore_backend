
const books = require('../Models/bookModels')
const users=require('../Controllers/useController')

// Add book : by user
exports.addBook = (req, res) => {
    const {title,author, noOfpages, imageUrl, price, discountPrice,abstract, publisher,language,isbn,category} = req.body

    const sellerMail = req.payload?.usermail

    const uploadedImages = req.files?.map(
        item => item.filename
    ) || []

    console.log({title,author,noOfpages,imageUrl,price,discountPrice,abstract,publisher,language,isbn, category,sellerMail,uploadedImages})

    res.status(200).json({ success: true, message: "Book data received successfully"})
}

