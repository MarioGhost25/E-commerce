import { ShoppingCart, ShoppingCartRepository } from "../.."

export interface GetCartByUserIdServiceInterface {
    execute(id: string): Promise<ShoppingCart>
}

export class GetCartByUserIdService implements GetCartByUserIdServiceInterface{
    
    constructor (
        private readonly shoppingCartRepository: ShoppingCartRepository
    ){}

    execute(id: string): Promise<ShoppingCart> {
        return this.shoppingCartRepository.getCartByUserId(id);
    }

}