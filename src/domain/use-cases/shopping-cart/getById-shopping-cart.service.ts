import { CreateShoppingCartDto, ShoppingCart, ShoppingCartRepository } from "../.."

export interface GetByIDShoppingCartServiceInterface {
    execute(id: string): Promise<ShoppingCart>
}

export class GetByIDShoppingCartService implements GetByIDShoppingCartService{
    
    constructor (
        private readonly shoppingCartRepository: ShoppingCartRepository
    ){}

    execute(id: string): Promise<ShoppingCart> {
        return this.shoppingCartRepository.getCartByUserId(id);
    }

}