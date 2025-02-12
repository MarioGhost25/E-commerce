import { CreateProductDto, ProductEntity, ProductRepository } from "../..";

export interface CreateProductInterface {
    execute(dto: CreateProductDto): Promise<ProductEntity>
}

export class CreateProductService implements CreateProductInterface {
    constructor(
        private readonly productRepository: ProductRepository,
    ){}

    execute(dto: CreateProductDto): Promise<ProductEntity> {
        return this.productRepository.createProduct(dto);
    }
}