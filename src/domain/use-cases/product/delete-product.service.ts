import { ProductEntity, ProductRepository } from "../..";

export interface DeleteProductInterface {
    execute(productId: string): Promise<ProductEntity>
}

export class DeleteProductService implements DeleteProductInterface {
    constructor(
        private readonly productRepository: ProductRepository,
    ){}

    execute(productId: string): Promise<ProductEntity> {
        return this.productRepository.deleteProduct(productId);
    }
}