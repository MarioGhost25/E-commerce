import { CreateShoppingCartDto, ShoppingCart, UpdateShoppingCartDto } from "..";


export abstract class ShoppingCartDatasource {
    abstract createShoppingCart(createShoppingCartDto: CreateShoppingCartDto ): Promise<ShoppingCart>;
    abstract updateShoppingCart(updateShoppingCartDto: UpdateShoppingCartDto ): Promise<ShoppingCart>;
    abstract getCartByUserId(id:string): Promise<ShoppingCart>;
    abstract searchALL(): Promise<ShoppingCart[]>;
}