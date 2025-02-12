import { CreateProductDto, ProductEntity, UpdateProductDto } from "..";

export abstract class ProductRepository{
    abstract createProduct(createProductDto: CreateProductDto): Promise<ProductEntity>;
    abstract updateProduct(updatedProductDto: UpdateProductDto): Promise<ProductEntity>;
    abstract searchALL(): Promise<ProductEntity[]>;
}