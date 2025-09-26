import mongoose, { Schema } from "mongoose";


const addressSchema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
}, { _id: false });

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'], // Regex for basic email validation
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    contactPhone: {
        type: String,
    },
    shippingAddresses: [addressSchema],
    // You can add a reference to a dedicated Role collection for more complex systems
    // role: { type: Schema.Types.ObjectId, ref: 'Role' }

}, {
    timestamps: true,
});

// userSchema.index({ email: 1 });

export const UserModel = mongoose.model('User', userSchema);
