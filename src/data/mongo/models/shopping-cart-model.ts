import mongoose from "mongoose";


const shoppingCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity:{
            type: Number,
            required: true
        },
    }]
})

export const ShoppingCartModel = mongoose.model('ShoppingCart', shoppingCartSchema);