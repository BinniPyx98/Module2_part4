import mongoose from "mongoose";

let Schema=mongoose.Schema;

export let UsersSchema = new mongoose.Schema({
    _id:Schema.Types.ObjectId,
    email: String,
    password: String
}, {collection: 'users'})

export let userModel = mongoose.model('userModel', UsersSchema)
