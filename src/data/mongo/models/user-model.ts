import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [ true, 'Name is required'],
    },
    email:{
        type: String,
        required:[ true, 'Email is required' ],
        unique: true,
    },
    password:{
        type: String,
        required: [ true, 'Password is required' ]
    },
})

userSchema.index({ email: 1 }, { unique: true, sparse: true });


export const UserModel = mongoose.model('User', userSchema);