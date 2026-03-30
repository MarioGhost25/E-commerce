import { UpdateShoppingCartDto, ShoppingCart, ShoppingCartRepository } from "../.."

export interface UpdateShoppingCartInterface {
    execute(dto: UpdateShoppingCartDto): Promise<ShoppingCart>
}

export class UpdateShoppingCartService implements UpdateShoppingCartInterface{
    
    constructor (
        private readonly shoppingCartRepository: ShoppingCartRepository
    ){}

    execute(dto: UpdateShoppingCartDto): Promise<ShoppingCart> {
        return this.shoppingCartRepository.updateShoppingCart(dto);
    }

}