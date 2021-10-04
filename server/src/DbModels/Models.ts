import mongoose, {Schema} from "mongoose";

let UsersSchema = new mongoose.Schema({
    email: String,
    password: String
}, {collection: 'users'})

let ImageSchema = new mongoose.Schema({
    path: String,
    metadata: Object,
    userId: String
}, {collection: 'image'})


export let userModel = mongoose.model('userModel', UsersSchema)
export let imageModel = mongoose.model('imageModel', ImageSchema)
