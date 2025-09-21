import mongoose, { Schema } from "mongoose";


const paymentSchema = new Schema({
    // --- Information about your application ---
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // You should also link the payment to what was purchased
    // orderId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Order', // Assuming you have an Order model
    //     required: true,
    // },

    // --- Core Payment Details ---
    amount: {
        type: Number,
        required: true,
        // Best practice: Store the amount in the smallest currency unit (e.g., cents).
        // So, $19.99 would be stored as 1999. This avoids floating-point errors.
    },
    currency: {
        type: String,
        required: true, // e.g., 'usd', 'eur'
    },
    status: {
        type: String,
        enum: ['pending', 'succeeded', 'failed', 'refunded'],
        default: 'pending',
    },

    // --- Key Stripe Identifiers (The most important part!) ---
    stripeCustomerId: {
        type: String,
        // The ID of the Customer object in Stripe (cus_xxxxxxxx)
    },
    stripePaymentIntentId: {
        type: String,
        required: true,
        unique: true, // Each payment intent should be unique
        // This is the primary ID for a transaction in modern Stripe (pi_xxxxxxxx)
    },
    stripeChargeId: {
        type: String,
        // The ID of the successful Charge object in Stripe (ch_xxxxxxxx)
        // You'll get this after the payment succeeds.
    },

    // --- Optional but useful payment method details ---
    paymentMethodDetails: {
        brand: String, // e.g., 'visa', 'mastercard'
        last4: String, // The last four digits of the card
    },

}, {
    // This automatically adds `createdAt` and `updatedAt` fields.
    // `createdAt` is a much better way to track the payment date.
    timestamps: true,
});
;

export const PaymentModel = mongoose.model('Payment', paymentSchema);