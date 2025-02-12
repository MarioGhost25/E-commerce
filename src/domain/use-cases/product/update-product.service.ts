import { ProductEntity, ProductRepository, UpdateProductDto } from "../..";

interface UpdateProductInterface {
    execute(dto: UpdateProductDto): Promise<ProductEntity>
}

export class UpdateProductService implements UpdateProductInterface {

    constructor(private readonly productRepository: ProductRepository) { }

    execute(updateProductDto: UpdateProductDto): Promise<ProductEntity> {
        return this.productRepository.updateProduct(updateProductDto);
    }

}