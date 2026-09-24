const mongoose=require('mongoose')

const connection_string=process.env.connection_string

mongoose.connect(connection_string).then((res)=>{
    console.log('server connected with mongoDB server')
}).catch((err)=>{
    console.log('MongoDB server connection failed')
    console.log(err)
})