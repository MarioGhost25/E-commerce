import { CreateShoppingCartDto, ShoppingCart, ShoppingCartRepository } from "../.."

export interface CreateShoppingCartInterface {
    execute(dto: CreateShoppingCartDto): Promise<ShoppingCart>
}

export class CreateShoppingCartService implements CreateShoppingCartInterface{
    
    constructor (
        private readonly shoppingCartRepository: ShoppingCartRepository
    ){}

    execute(dto: CreateShoppingCartDto): Promise<ShoppingCart> {
        return this.shoppingCartRepository.createShoppingCart(dto);
    }

}