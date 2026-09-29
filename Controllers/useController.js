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
            res.status(200).json({"token":token})
        }
        else{
            res.status(401).json({'msg':'inavalid email/password'})
        }
    }else{
        res.status(400).json('Invalid password/email')
    }
    
}

//profile update
exports.userUpadate=(req,res)=>{
    res.send('get hit')
}
