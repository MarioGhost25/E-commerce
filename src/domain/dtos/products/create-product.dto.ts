import { Types } from 'mongoose';

// Tipo literal para status válidos
export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';
export const validStatus: StockStatus[] = ['In Stock', 'Low Stock', 'Out of Stock'];

export class CreateProductDto {

    private constructor(
        public readonly name: string,
        public readonly originalPrice: number,
        public readonly price: number | null,
        public readonly description: string,
        public readonly longDescription: string | null,
        public readonly category: string,
        public readonly stock: number,
        public readonly user: string,
        public readonly stockStatus: StockStatus,
        public readonly isActive?: boolean,
        public readonly rating?: number,
        public readonly images?: string[],
    ) { }

    public static createProduct(object: { [key: string]: any }): [string?, CreateProductDto?] {
        const {
            name,
            originalPrice,
            price,
            description,
            longDescription,
            category,
            stock,
            user,
            stockStatus,
            isActive,
            rating,
            images,
        } = object;

        let newOriginalPrice = originalPrice !== undefined ? Number(originalPrice) : originalPrice;
        let newPrice = price === null ? null : price !== undefined ? Number(price) : undefined;
        let stockNumber = stock !== undefined ? Number(stock) : stock;
        const normalizedLongDescription = longDescription;

        // 1. Required Fields Validation
        if (!name) return ["Missing name", undefined];
        if (newOriginalPrice === undefined) return ["Missing originalPrice", undefined];
        if (!description) return ["Missing description", undefined];
        if (!category) return ["Missing category", undefined];
        if (stockNumber === undefined) return ["Missing stock", undefined];
        if (!user) return ["Missing seller ID", undefined];
        if (!validStatus.includes(stockStatus)) {
            return ["Invalid stock status", undefined];
        }

        // 2. Type and Value Validation
        if (typeof name !== 'string') return ["Name must be a string", undefined];
        if (typeof description !== 'string') return ["Description must be a string", undefined];
        if (normalizedLongDescription !== undefined && normalizedLongDescription !== null && typeof normalizedLongDescription !== 'string') {
            return ["Long description must be a string", undefined];
        }
        if (typeof category !== 'string') return ["Category must be a string", undefined];
        if (typeof stockStatus !== 'string') {
            // Normaliza el valor recibido (por si viene null, undefined o string incorrecto)
            if (!validStatus.includes(stockStatus)) {
                return ["Invalid stock status", undefined];
            }
        }

        if (typeof newOriginalPrice !== 'number' || Number.isNaN(newOriginalPrice) || newOriginalPrice < 0) {
            return ["Original price must be a non-negative number", undefined];
        }

        if (newPrice !== undefined && newPrice !== null && (typeof newPrice !== 'number' || Number.isNaN(newPrice) || newPrice < 0)) {
            return ["Price must be a non-negative number", undefined];
        }

        if (typeof newPrice === 'number' && newPrice > newOriginalPrice) {
            return ["Price cannot be greater than original price", undefined];
        }

        if (typeof stockNumber !== 'number' || !Number.isInteger(stockNumber) || stockNumber < 0) {
            return ["Stock must be a non-negative integer", undefined];
        }

        if (!Types.ObjectId.isValid(user)) {
            return ["Invalid user ID", undefined];
        }

        // 3. Optional Fields Validation
        if (images) {
            if (!Array.isArray(images) || !images.every(img => typeof img === 'string')) {
                return ["Images must be an array of strings", undefined];
            }
        }

        return [undefined, new CreateProductDto(
            name,
            newOriginalPrice,
            newPrice ?? null,
            description,
            normalizedLongDescription ?? null,
            category,
            stockNumber,
            user,
            stockStatus,
            isActive,
            rating,
            images,
        )];
    }
}
