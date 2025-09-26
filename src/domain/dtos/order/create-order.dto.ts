import { Types } from 'mongoose';

type OrderProductItem = {
    product: string; // Product ID
    quantity: number;
    price: number; // Price at the time of purchase
};

type ShippingAddress = {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
};


export class CreateOrderDto {

    private constructor(
        public readonly user: string,
        public readonly products: OrderProductItem[],
        public readonly totalAmount: number,
        public readonly shippingAddress: ShippingAddress,
        public readonly status?: string
    ) {}

    public static create(object: { [key: string]: any }): [string?, CreateOrderDto?] {
        const {
            user,
            products,
            totalAmount,
            shippingAddress,
            status
        } = object;

        // 1. Required Fields Validation
        if (!user) return ["Missing user ID", undefined];
        if (!products) return ["Missing products", undefined];
        if (totalAmount === undefined) return ["Missing total amount", undefined];
        if (!shippingAddress) return ["Missing shipping address", undefined];

        // 2. Type and Value Validation
        if (!Types.ObjectId.isValid(user)) {
            return ["Invalid user ID", undefined];
        }

        if (!Array.isArray(products) || products.length === 0) {
            return ["Products must be a non-empty array", undefined];
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

        if (typeof totalAmount !== 'number' || totalAmount < 0) {
            return ["Total amount must be a non-negative number", undefined];
        }
        
        // Validate shipping address
        if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode || !shippingAddress.country) {
            return ["All fields in the shipping address are required", undefined];
        }

        // 3. Optional Fields Validation
        if (status) {
            const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
            if (typeof status !== 'string' || !validStatuses.includes(status)) {
                 return [`Invalid status. Must be one of: ${validStatuses.join(', ')}`, undefined];
            }
        }

        return [undefined, new CreateOrderDto(user, products, totalAmount, shippingAddress, status)];
    }
}
