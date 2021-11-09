/*const redis = require('redis')
require('dotenv').config();

const client = redis.createClient({
    port:process.env.DB_PORT_REDIS,
    host: process.env.DB_HOST_REDIS
})

client.on('connect',()=>{
    console.log("Cliente conectadose a redis..")
})

client.on('ready',()=>{
    console.log("redis conectado")
})

client.on('error',(err=>{
    console.log(err.message)
}))

client.on('end',()=>{
    console.log("redis desconectado")
})

process.on('SIGINT',()=>{
    client.quit()
})

module.exports=client*/