import { CreateProductDto, ProductDatasource, ProductEntity, ProductRepository, UpdateProductDto } from "../../domain";

export class ProductRepositoryImpl implements ProductRepository{

    constructor(
        private readonly productDatasource: ProductDatasource,
    ){}

    createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
        return this.productDatasource.createProduct(createProductDto);
    }
    updateProduct(updatedProductDto: UpdateProductDto): Promise<ProductEntity> {
        return this.productDatasource.updateProduct(updatedProductDto);
    }
    searchALL(): Promise<ProductEntity[]> {
        return this.productDatasource.searchALL();
    }
    
}