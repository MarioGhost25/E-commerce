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
    longDescription: {
        type: String,
        max: [200, 'Long description cannot exceed 200 characters'],
    },
    features: [{
        type: String,
        trim: true,
    }],
    originalPrice: {
        type: Number,
        required: true,
        min: [0, 'Original price cannot be negative'],
    },
    price: {
        type: Number,
        default: null,
        min: [0, 'Price cannot be negative'],
    },
    reviews: [{
        user: {
            type: Schema.Types.ObjectId
        },
        rating: {
            type: Number,
            min: [0, 'Rating cannot be negative'],
            max: [5, 'Rating cannot be greater than 5']
        },
        comment: {
            type: String,
            max: [100, 'Comment cannot exceed 100 characters']
        },
    }],
    sku: {
        type: String,
        required: [true, 'SKU is required'],
        unique: true, // Stock Keeping Unit
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
        max: [5, 'Rating cannot be greater than 5'],
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
    category: {
        type: Schema.Types.ObjectId, 
        ref: 'Category',
        required: true,
    },
    
}, {
    timestamps: true,
});

// productSchema.index({ sku: 1 });
// productSchema.index({ name: 'text', description: 'text' }); // For text-based search

export const ProductModel = mongoose.model('Product', productSchema);
