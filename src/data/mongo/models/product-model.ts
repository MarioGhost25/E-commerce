import mongoose, { Schema } from "mongoose";


const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Removes whitespace from both ends
    },
    sku: {
        type: String,
        required: true,
        unique: true, // Stock Keeping Unit
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative'],
    },
    category: {
        type: String,
        required: true,
        // Consider creating a separate Category collection for better management
        // type: Schema.Types.ObjectId, 
        // ref: 'Category'
    },
    stockStatus:{
        type: String,
        enum: ['In Stock', 'Low Stock' ,'Out of Stock'],
        default: 'Out of Stock',

    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'Stock cannot be negative'],
    },
    isActive:{
        type: Boolean,
        default: false,
    },
    images: [{
        type: String, // Array of image URLs
    }],
    // Renamed for clarity
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

}, {
    timestamps: true,
});

// productSchema.index({ sku: 1 });
// productSchema.index({ name: 'text', description: 'text' }); // For text-based search

export const ProductModel = mongoose.model('Product', productSchema);
