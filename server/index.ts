//import * as db from 'mongodb'
import mongoose from 'mongoose'
//const MongoClient = db.MongoClient
import start from "./listenServer.js";

let dbConnection


mongoose.connect('mongodb+srv://XiLLeR:Kalina270698@cluster0.qckeb.mongodb.net/test?retryWrites=true&w=majority')

let UsersSchema = new mongoose.Schema({
    email: String,
    password: String
}, {collection: 'users'})

let ImageSchema = new mongoose.Schema({
    path: String,
    metadata: Object
}, {collection: 'image'})

let checkConnect = mongoose.connection

checkConnect.on('error', (error) => {
    console.log(error)
})
checkConnect.on('open', () => {
    console.log("Connect to db success")
    start()
})


export let userModel = mongoose.model('userModel', UsersSchema)
export let imageModel = mongoose.model('imageModel', ImageSchema)


// MongoClient.connect(, function (err, database) {
//
//     if (err) {
//         console.log(err)
//     } else {
//         dbConnection = database.db('test')
//         start()//listen port
//     }
// })

// export function getDbConnection() {
//
//     return dbConnection
// }

