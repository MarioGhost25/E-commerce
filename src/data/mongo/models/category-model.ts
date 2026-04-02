import mongoose, { Schema } from "mongoose";


const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    slug:{
        type: String,
        unique: true,
    },
    image: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    }, {
    timestamps: true,
});

export const CategoryModel = mongoose.model('Category', CategorySchema);