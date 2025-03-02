import { Types } from "mongoose";


export class CreateShoppingCartDto {

    constructor(
        public userId: string,
        public quantity: number,
        public productIds: string[],
    ) { }

    public static create(object: { [key: string]: any }): [string?, CreateShoppingCartDto?] {
        const { user, quantity, productIds } = object;
        const userId = user;

        if (!userId) return ["Missing User Id", undefined];
        if (!Types.ObjectId.isValid(userId)) {
            return ['Invalid User ID', undefined];
        }
        
        if (!Array.isArray(productIds)) {
            return ['Product IDs must be an array', undefined];
        }

        const invalidProductIds = productIds.filter((id: string) => !Types.ObjectId.isValid(id));
        if (invalidProductIds.length > 0) {
            return ['Invalid Product IDs', undefined];
        }

        return [undefined, new CreateShoppingCartDto(userId, quantity, productIds)];

    }
}