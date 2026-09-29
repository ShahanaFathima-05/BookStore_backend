// DNS fix
require('dns').setDefaultResultOrder('ipv4first')


//loads .env file contents into process.env by default
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./Routes/routes')
require('./dbConnect/db')



//creating server instance
const server=express()


//enabling cors in server
server.use(cors())

//enabling json middleware
server.use(express.json())

//cofiguring router
server.use(router)


//setup port number
const port=process.env.PORT


//start server to listen client requests to thst port/available server in internet
server.listen(port,()=>{
    console.log(`Server Started at ${port} & waiting for client requests`)
})

//Resolving API(htttp://localhost:3000) using express
// server.get('/',(req,res)=>{
//     res.send('<h1>Server running waiting for requests</h1>')
// })

// server.post('/addbook',(req,res)=>{
//     res.send('POST HIT')
// })

// server.get('/getbook',(req,res)=>{
//     res.status(201).json({'title':'pathumayude aadu','price':120,'Author':'Basheer'})
// })

// server.delete('/deletebook',(req,res)=>{
//     res.send('deleted')
// })