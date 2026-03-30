import { Types } from 'mongoose';

type ProductItem = {
    product: string; // Product ID
    quantity: number;
    price: number; // Price at the time of adding to cart
};

export class CreateShoppingCartDto {

    constructor(
        public readonly userId: string,
        public readonly products: ProductItem[],
    ) { }

    public static create(object: { [key: string]: any }): [string?, CreateShoppingCartDto?] {
        const { user, products } = object;

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

        return [undefined, new CreateShoppingCartDto(user, products)];
    }
}