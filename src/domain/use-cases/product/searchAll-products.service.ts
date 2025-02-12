import { ProductEntity, ProductRepository } from "../..";

interface SearchAllProductsInterface{
    execute():Promise<ProductEntity[]>
}

export class SearchAllProducts implements SearchAllProductsInterface{

    constructor(private readonly productRepository:ProductRepository){}

    execute(): Promise<ProductEntity[]> {
        return this.productRepository.searchALL();
    }

}