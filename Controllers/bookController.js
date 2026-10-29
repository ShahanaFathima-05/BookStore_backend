
const books = require('../Models/bookModels')
const users = require('../Models/userModels')
const stripe = require('stripe')(process.env.stripe)

// Add book : by user
exports.addBook = async (req, res) => {
    try {
        const { title, author, noOfpages, imageUrl, price, discountPrice, abstract, publisher, language, isbn, category } = req.body
        console.log("Request body:", req.body)

        const userId = req.payload?.userid
        const seller = await users.findById(userId)
        const sellerMail = seller.email
        const uploadedImages = req.files?.map(item => item.filename) || []

        const existbook = await books.findOne({ sellerMail, isbn })
        if (existbook) {
            return res.status(400).json({ msg: "Book already exists" })
        }

        const newBook = await books.create({ title, author, noOfpages, imageUrl, price, discountPrice, abstract, publisher, language, isbn, category, sellerMail, buyerMail: "", uploadedImages })
        return res.status(201).json({ msg: "Book added successfully", book: newBook })
    } catch (error) {
        console.log("Add book error:", error)
        return res.status(400).json({ message: error.message })
    }
}



exports.latestBooks = async (req, res) => {
    const latestBooks = await books.find()
    res.status(200).json(latestBooks.slice(0, 4))
}

exports.booklist = async (req, res) => {
    const userId = req.payload?.userid
    const seller = await users.findById(userId)
    const sellerMail = seller.email
    const booklist = await books.find({ sellerMail: { $ne: sellerMail } },{status:'approved'})
    res.status(200).json(booklist)
}

exports.userAddedBook = async (req, res) => {
    const userId = req.payload?.userid
    const seller = await users.findById(userId)
    const sellerMail = seller.email
    const booklist = await books.find({ sellerMail })
    res.status(200).json(booklist)
}

exports.deleteAddedBook = async (req, res) => {
    const { bid } = req.params
    const deletebook = await books.findByIdAndDelete(bid)
    res.status(200).json(deletebook)
}

exports.purchasedBookList = async (req, res) => {
    const userId = req.payload?.userid
    const buyer = await users.findById(userId)
    const buyerMail = buyer.email
    const purchasedBooklist = await books.find({ buyerMail })
    res.status(200).json(purchasedBooklist)
}

exports.getBookById = async (req, res) => {
    const { bid } = req.params
    const bookdetail = await books.findById(bid)
    res.status(200).json(bookdetail)
}

exports.getAdminAllbooks=async(req,res)=>{
    const allbooks=await books.find()
     res.status(200).json(allbooks)
}

exports.approveBook=async(req,res)=>{
    const {bid}=req.params
    const bookDetail=await books.findById(bid)
    bookDetail.status="approved"
    await bookDetail.save()
    res.status(200).json(bookDetail)
}

exports.bookPayment = async (req, res) => {
    const {bid}=req.params
    const userId = req.payload?.userid
    const buyer = await users.findById(userId)
    // const buyerMail = buyer.email
    const bookDetail = await books.findById(bid)
    // bookDetail.status = "sold"
    // bookDetail.buyerMail = buyerMail
    // await bookDetail.save()
    //create stripe checkout session
    const line_items = [{
        price_data: {
            currency: "usd",
            product_data: {
                name: bookDetail.title,
                description: `${bookDetail.author}-${bookDetail.publisher}`,
                images: bookDetail.uploadedImages,
                metadata: {
                    title:bookDetail.title,author:bookDetail.author
                },
            },
            unit_amount:bookDetail.discountPrice 
        },
        quantity:1,
    }]

    const session=await stripe.checkout.sessions.create({
        success_url:"http://localhost:5173/success",
        cancel_url:"http://localhost:5173/failure",
        line_items,
        mode:'payment',
        allowed_payment_method_types:['card']
    })
    console.log(session)
    res.status(200).json(session)
}
