import { DecreaseProductsQuantityDto, ShoppingCart, ShoppingCartRepository } from "../.."

export interface DecreaseProductsQuantityInterface {
    execute(dto: DecreaseProductsQuantityDto): Promise<ShoppingCart>
}

export class DecreaseProductsQuantityService implements DecreaseProductsQuantityInterface{
    
    constructor (
        private readonly shoppingCartRepository: ShoppingCartRepository
    ){}

    execute(dto: DecreaseProductsQuantityDto): Promise<ShoppingCart> {
        return this.shoppingCartRepository.decreaseProductsQuantity(dto);
    }

}