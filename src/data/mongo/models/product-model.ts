import mongoose, { Schema } from "mongoose";


const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Removes whitespace from both ends
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
    sku: {
        type: String,
        required: [true, 'SKU is required'],
        unique: true, // Stock Keeping Unit
    },
    category: {
        type: String,
        required: true,
        // Consider creating a separate Category collection for better management
        // type: Schema.Types.ObjectId, 
        // ref: 'Category'
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'Stock cannot be negative'],
    },
    stockStatus:{
        type: String,
        enum: ['In Stock', 'Low Stock' ,'Out of Stock'],
        default: 'Out of Stock',
        
    },
    isActive:{
        type: Boolean,
        default: false,
    },
    rating:{
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be negative'],
        max: [5, 'Rating cannot be greater than 5']

    },
    images: [{
       type: String,
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
