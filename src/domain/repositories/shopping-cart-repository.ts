
import { CreateShoppingCartDto, ShoppingCart, UpdateShoppingCartDto, } from "..";


export abstract class ShoppingCartRepository   {
    abstract createShoppingCart(createShoppingCartDto: CreateShoppingCartDto ): Promise<ShoppingCart>;
    abstract updateShoppingCart(updateShoppingCartDto: UpdateShoppingCartDto): Promise<ShoppingCart>;
    //abstract getShoppingCart(): Promise<ShoppingCart[]>
    abstract getCartByUserId(id:string): Promise<ShoppingCart>;
    abstract searchALL(): Promise<ShoppingCart[]>;
}