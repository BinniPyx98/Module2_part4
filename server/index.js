import app from "./server.js";
import logger from './src/logger/logger.js';
import db from 'mongodb';
const MongoClient = db.MongoClient;
let dbTest;
app.get('/users', (req, res) => {
    dbTest.collection('users').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        else {
            res.send(docs);
        }
    });
});
MongoClient.connect('mongodb+srv://XiLLeR:Kalina270698@cluster0.qckeb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function (err, database) {
    if (err) {
        return console.log(err);
    }
    dbTest = database.db('test');
    app.listen(5400, () => {
        logger.info('Server running');
    });
});
//# sourceMappingURL=index.js.map