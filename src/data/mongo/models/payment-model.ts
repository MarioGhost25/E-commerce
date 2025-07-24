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
    paymentDate: {
        type: Date,
        required: true
    },
    status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    stripeSessionId: { type: String },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

})

export const PaymentModel = mongoose.model('Payment', paymentSchema);