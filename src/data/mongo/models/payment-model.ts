import mongoose, { Schema } from "mongoose";


const paymentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    order: {
        type: String,
        unique: true, 
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'succeeded', 'failed', 'refunded'],
        default: 'pending',
    },
    stripePaymentIntentId: {
        type: String,
        required: true,
        unique: true, 
    },
    stripeChargeId: {
        type: String,
    },
    paymentMethodDetails: {
        brand: String, 
        last4: String, 
    },

}, {
    timestamps: true,
});


// paymentSchema.index({ stripePaymentIntentId: 1 });

export const PaymentModel = mongoose.model('Payment', paymentSchema);