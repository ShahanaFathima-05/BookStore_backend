const users=require('../Models/userModels')
const bcrypt=require('bcrypt')


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
exports.userLogin=(req,res)=>{
    res.status(201).json('POST HIT')
}

//profile update
exports.userUpadate=(req,res)=>{
    res.send('get hit')
}
