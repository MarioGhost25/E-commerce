import { RemoveProductsDto, ShoppingCart, ShoppingCartRepository } from "../.."

export interface RemoveProductsInterface {
    execute(dto: RemoveProductsDto): Promise<ShoppingCart>
}

export class RemoveProductsService implements RemoveProductsInterface{
    
    constructor (
        private readonly shoppingCartRepository: ShoppingCartRepository
    ){}

    execute(dto: RemoveProductsDto): Promise<ShoppingCart> {
        return this.shoppingCartRepository.removeProducts(dto);
    }

}