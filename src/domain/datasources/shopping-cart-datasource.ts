import { CreateShoppingCartDto, ShoppingCart } from "..";


export abstract class ShoppingCartDatasource {
    abstract createShoppingCart(createShoppingCartDto: CreateShoppingCartDto ): Promise<ShoppingCart>;
    abstract updateShoppingCart(): Promise<ShoppingCart>;
    abstract getCartByUserId(id:string): Promise<ShoppingCart>;
    abstract searchALL(): Promise<ShoppingCart[]>;
}