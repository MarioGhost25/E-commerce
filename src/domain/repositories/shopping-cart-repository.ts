
import { CreateShoppingCartDto, ShoppingCart, } from "..";


export abstract class ShoppingCartRepository   {
    abstract createShoppingCart(createShoppingCartDto: CreateShoppingCartDto ): Promise<ShoppingCart>;
    abstract updateShoppingCart(): Promise<ShoppingCart>;
    abstract getCartByUserId(id:string): Promise<ShoppingCart>;
    abstract searchALL(): Promise<ShoppingCart[]>;
}