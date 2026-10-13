
const books = require('../Models/bookModels')
const users = require('../Models/userModels')

// Add book : by user
exports.addBook = async (req, res) => {
    try {
        const {title,author,noOfpages,imageUrl,price,discountPrice,abstract,publisher,language, isbn, category} = req.body
        console.log("Request body:", req.body)
       
        const userId = req.payload?.userid
        const seller = await users.findById(userId)
        const sellerMail = seller.email
        const uploadedImages = req.files?.map( item => item.filename) || []
      
        const existbook = await books.findOne({sellerMail, isbn})
        if (existbook) {
            return res.status(400).json({msg: "Book already exists"})
        }
    
        const newBook = await books.create({title,author,noOfpages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category,sellerMail,buyerMail: "",uploadedImages})
        return res.status(201).json({ msg: "Book added successfully", book: newBook})
    } catch (error) {
        console.log("Add book error:", error)
        return res.status(400).json({ message: error.message})
    }
}



exports.latestBooks = async (req, res) => {
    const latestBooks=await books.find()
    res.status(200).json(latestBooks.slice(0,4))
}

exports.booklist = async (req, res) => {
    const userId = req.payload?.userid
    const seller = await users.findById(userId)
    const sellerMail = seller.email
    const booklist = await books.find({ sellerMail:{$ne: sellerMail } })
    res.status(200).json(booklist)
}