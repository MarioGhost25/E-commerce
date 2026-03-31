import { AddProductsDto, ShoppingCart, ShoppingCartRepository } from "../.."

export interface AddProductsInterface {
    execute(dto: AddProductsDto): Promise<ShoppingCart>
}

export class AddProductsService implements AddProductsInterface{
    
    constructor (
        private readonly shoppingCartRepository: ShoppingCartRepository
    ){}

    execute(dto: AddProductsDto): Promise<ShoppingCart> {
        return this.shoppingCartRepository.addProducts(dto);
    }

}