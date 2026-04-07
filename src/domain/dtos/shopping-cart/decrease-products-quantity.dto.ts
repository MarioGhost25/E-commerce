import { Types } from "mongoose";

type ProductItem = {
    _id: string;
    quantity: number;
};

export class DecreaseProductsQuantityDto {

    constructor(
        public readonly userId: string,
        public readonly products: ProductItem[],
    ) { }

    public static decrease(object: { [key: string]: any }): [string?, DecreaseProductsQuantityDto?] {
        const { user, products } = object;

        if (!user) return ["Missing user ID", undefined];
        if (!products) return ["Missing products", undefined];

        if (!Types.ObjectId.isValid(user)) {
            return ["Invalid user ID", undefined];
        }

        if (!Array.isArray(products)) {
            return ["Products must be an array", undefined];
        }

        for (const item of products) {
            if (!item._id || !item.quantity) {
                return ["Each product item must include _id and quantity", undefined];
            }

            if (!Types.ObjectId.isValid(item._id)) {
                return [`Invalid item ID: ${item._id}`, undefined];
            }

            if (typeof item.quantity !== 'number' || !Number.isInteger(item.quantity) || item.quantity < 1) {
                return ["Product quantity must be a positive integer", undefined];
            }
        }

        return [undefined, new DecreaseProductsQuantityDto(user, products)];
    }

}