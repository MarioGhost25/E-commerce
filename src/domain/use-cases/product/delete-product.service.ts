import { ProductEntity, ProductRepository } from "../..";

export interface DeleteProductInterface {
    execute(productId: string, categoryId: string): Promise<ProductEntity>
}

export class DeleteProductService implements DeleteProductInterface {
    constructor(
        private readonly productRepository: ProductRepository,
    ){}

    execute(productId: string, categoryId: string): Promise<ProductEntity> {
        return this.productRepository.deleteProduct(productId, categoryId);
    }
}