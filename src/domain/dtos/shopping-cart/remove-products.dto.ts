import { Types } from "mongoose";

type ProductItem = {
    _id: string;
};

export class RemoveProductsDto {


    constructor(
        public readonly userId: string,
        public readonly products: ProductItem[],
    ) { }

    public static remove(object: { [key: string]: any }): [string?, RemoveProductsDto?] {
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
        if (!item._id) {
            return ["Each product item must include _id", undefined];
        }

        if (!Types.ObjectId.isValid(item._id)) {
            return [`Invalid item ID: ${item._id}`, undefined];
        }
    }

        return [undefined, new RemoveProductsDto(user, products)];
    }

}