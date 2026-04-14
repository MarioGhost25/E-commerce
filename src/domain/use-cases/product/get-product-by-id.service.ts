import { ProductEntity, ProductRepository } from "../..";

interface GetProductByIdInterface {
    execute(id: string): Promise<ProductEntity>
}

export class GetProductByIdService implements GetProductByIdInterface {

    constructor(private readonly productRepository: ProductRepository) { }

    execute(id: string): Promise<ProductEntity> {
        return this.productRepository.getProductById(id);
    }
}