import mongoose, { Schema } from "mongoose";


const shoppingCartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true, // A user should have only one active cart
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1'],
        },
        // Storing the price when the item is added to the cart
        price: {
            type: Number,
            required: true,
        },
    }],
    total:{
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['active', 'converted', 'abandoned'],
        default: 'active',
    }
}, {
    timestamps: true,
});

export const ShoppingCartModel = mongoose.model('ShoppingCart', shoppingCartSchema);