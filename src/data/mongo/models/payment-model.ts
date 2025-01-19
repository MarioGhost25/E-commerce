import mongoose, { Schema } from "mongoose";


const paymentSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentDate: {
        type: Date,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }
})

export const Payment = mongoose.model('Payment', paymentSchema);