import app from "./server.js"
import * as db from 'mongodb'
const MongoClient =db.MongoClient
let ObjectID = db.ObjectID
import start from "./listenServer.js";



let dbConnection

app.get('/users/:id', (req, res) => {
    dbConnection.collection('users').findOne({_id: new ObjectID(req.params.id)}, (err, doc) => {

        if (err) {
            console.log(err)
            res.sendStatus(500)
        }

        res.send(doc)
        console.log(doc)
    })


})


MongoClient.connect('mongodb+srv://XiLLeR:Kalina270698@cluster0.qckeb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function (err, database) {

    if (err) {

        return console.log(err)
    }else{
        dbConnection = database.db('test')
        start()
    }

})


export function getDb(){

    return dbConnection
}

