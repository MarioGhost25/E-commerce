import { Types } from 'mongoose';

type ProductItem = {
    product: string; // Product ID
    quantity: number;
    price: number; // Price at the time of adding to cart
};

export class CreateShoppingCartDto {

private constructor(
        public readonly userId: string, // User ID
        public readonly products: ProductItem[],
        public readonly status?: string,
    ) {}

    public static create(object: { [key: string]: any }): [string?, CreateShoppingCartDto?] {
        const { user, products, status } = object;

        // 1. Required Fields Validation
        if (!user) return ["Missing user ID", undefined];
        if (!products) return ["Missing products", undefined];

        // 2. Type and Value Validation
        if (!Types.ObjectId.isValid(user)) {
            return ["Invalid user ID", undefined];
        }

        if (!Array.isArray(products)) {
            return ["Products must be an array", undefined];
        }

        // Validate each item in the products array
        for (const item of products) {
            if (!item.product || !item.quantity || item.price === undefined) {
                return ["Each product item must include product ID, quantity, and price", undefined];
            }
            if (!Types.ObjectId.isValid(item.product)) {
                return [`Invalid product ID: ${item.product}`, undefined];
            }
            if (typeof item.quantity !== 'number' || !Number.isInteger(item.quantity) || item.quantity < 1) {
                return ["Product quantity must be a positive integer", undefined];
            }
            if (typeof item.price !== 'number' || item.price < 0) {
                return ["Product price must be a non-negative number", undefined];
            }
        }

        // 3. Optional Fields Validation
        if (status) {
            const validStatuses = ['active', 'converted', 'abandoned'];
            if (typeof status !== 'string' || !validStatuses.includes(status)) {
                return [`Invalid status. Must be one of: ${validStatuses.join(', ')}`, undefined];
            }
        }

        return [undefined, new CreateShoppingCartDto(user, products, status)];
    }
}