import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    gmail:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },

    
})

export const User = mongoose.model('User', userSchema);