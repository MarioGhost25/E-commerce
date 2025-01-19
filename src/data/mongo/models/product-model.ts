import mongoose, { Schema } from "mongoose";



const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },

    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }




})

export const Product = mongoose.model('Product', productSchema);