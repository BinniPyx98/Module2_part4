import mongoose from 'mongoose'
import start from "./listenServer.js";

mongoose.connect('mongodb+srv://XiLLeR:Kalina270698@cluster0.qckeb.mongodb.net/test?retryWrites=true&w=majority')


let checkConnect = mongoose.connection

checkConnect.on('error', (error) => {
    console.log(error)
})
checkConnect.on('open', () => {
    console.log("Connect to db success")
    start()
})


