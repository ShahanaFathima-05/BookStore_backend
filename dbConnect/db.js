const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose')

const connection_string = process.env.connection_string

console.log("MongoDB URL exists:", !!connection_string)

mongoose.connect(connection_string)
    .then(() => {
        console.log('Server connected with MongoDB server')
    })
    .catch((err) => {
        console.log('MongoDB server connection failed')
        console.log(err)
    })