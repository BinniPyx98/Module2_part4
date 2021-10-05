import mongoose from "mongoose";

export let ImageSchema = new mongoose.Schema({
    path: String,
    metadata: Object,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel'}
}, {collection: 'image'})

export let imageModel = mongoose.model('imageModel', ImageSchema)
