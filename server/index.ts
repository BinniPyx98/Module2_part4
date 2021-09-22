import * as db from 'mongodb'

const MongoClient = db.MongoClient
import start from "./listenServer.js";

let dbConnection

MongoClient.connect('mongodb+srv://XiLLeR:Kalina270698@cluster0.qckeb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function (err, database) {

    if (err) {
        console.log(err)
    } else {
        dbConnection = database.db('test')
        start()//listen port
    }
})

export function getDbConnection() {

    return dbConnection
}

