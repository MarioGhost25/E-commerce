import { Types } from 'mongoose';

export class CreateProductDto {

    private constructor(
        public readonly name: string,
        public readonly sku: string,
        public readonly price: number,
        public readonly description: string,
        public readonly category: string,
        public readonly stock: number,
        public readonly seller: string, // Changed from userId to seller
        public readonly images?: string[],
    ) {}

    public static createProduct(object: { [key: string]: any }): [string?, CreateProductDto?] {
        const {
            name,
            sku,
            price,
            description,
            category,
            stock,
            seller,
            images,
        } = object;

        // 1. Required Fields Validation
        if (!name) return ["Missing name", undefined];
        if (!sku) return ["Missing SKU", undefined];
        if (price === undefined) return ["Missing price", undefined];
        if (!description) return ["Missing description", undefined];
        if (!category) return ["Missing category", undefined];
        if (stock === undefined) return ["Missing stock", undefined];
        if (!seller) return ["Missing seller ID", undefined];

        // 2. Type and Value Validation
        if (typeof name !== 'string') return ["Name must be a string", undefined];
        if (typeof sku !== 'string') return ["SKU must be a string", undefined];
        if (typeof description !== 'string') return ["Description must be a string", undefined];
        if (typeof category !== 'string') return ["Category must be a string", undefined];

        if (typeof price !== 'number' || price < 0) {
            return ["Price must be a non-negative number", undefined];
        }

        if (typeof stock !== 'number' || !Number.isInteger(stock) || stock < 0) {
            return ["Stock must be a non-negative integer", undefined];
        }

        if (!Types.ObjectId.isValid(seller)) {
            return ["Invalid seller ID", undefined];
        }

        // 3. Optional Fields Validation
        if (images) {
            if (!Array.isArray(images) || !images.every(img => typeof img === 'string')) {
                return ["Images must be an array of strings", undefined];
            }
        }

        return [undefined, new CreateProductDto(
            name,
            sku,
            price,
            description,
            category,
            stock,
            seller,
            images
        )];
    }
}
