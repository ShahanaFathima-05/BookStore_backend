const users=require('../Models/userModels')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


//registration
exports.useRegister=async (req,res)=>{
    

    const {username,email,password}=req.body
    if(username && email && password){
        try{
            const existRegister=await users.findOne({email})
            if(existRegister){
                res.status(401).json({"msg":"User alraedy exists!!"})
            }
            else{
                const hashPassword=await bcrypt.hash(password,10)
                const response=await users.create({username,email,password:hashPassword})
                res.status(201).json(response)
            }
        }catch(err){
            console.log(err)
            res.status(400).json(err)
        }
    }else{
        res.status(202).json("Enter valid input")
    }
}

//login
exports.userLogin=async (req,res)=>{
    const {email,password}=req.body
    const existUser=await users.findOne({email})
    if(existUser){
        console.log(existUser)
        const passwordResult=await bcrypt.compare(password,existUser.password)
        if(passwordResult){
            const token=jwt.sign({userid:existUser._id},process.env.secretkey)
            res.status(200).json({"token":token,"user":existUser})
        }
        else{
            res.status(401).json({'msg':'inavalid email/password'})
        }
    }else{
        res.status(400).json('Invalid password/email')
    }
    
}

// googlelogin
exports.googleLogin=async (req,res)=>{
    try{
        const {name,email,picture}=req.body
        const existUser=await users.findOne({email})
        if(existUser){
            console.log(existUser)
            const token=jwt.sign({userid:existUser._id,useremail:existUser.email},process.env.secretkey)
            res.status(200).json({"token":token,"user":existUser})
        }
        else{
            const newuser=await users.create({username:name,email,password:"123",picture:picture})
            console.log(newuser)
            const token=jwt.sign({userid:newuser._id,useremail:newuser.email},process.env.secretkey)
            res.status(200).json({"token":token,"user":newuser})
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

//profile update
exports.userUpadate=async (req,res)=>{
    // console.log(req.body)
    // console.log(req.file)
    // console.log(req.params)
    // console.log(req.query)
    // console.log(req.payload)
    const {email,password,bio,username,picture}=req.body
    const id=req.payload?.userid
    const useremail=req.payload?.email
    const pic=req.file?req.file.filename:picture
    const encyrptpass=await bcrypt.hash(password,10)
    const updateuser=await users.findByIdAndUpdate({_id:id},{username,email:useremail,bio,password:encyrptpass,picture:pic},{new:true})
    res.status(200).json(updateuser)
}
