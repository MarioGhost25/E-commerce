
import { CreateShoppingCartDto, ShoppingCart, AddProductsDto, RemoveProductsDto, DecreaseProductsQuantityDto, } from "..";


export abstract class ShoppingCartRepository   {
    abstract createShoppingCart(createShoppingCartDto: CreateShoppingCartDto ): Promise<ShoppingCart>;
    abstract addProducts(addProductsDto: AddProductsDto): Promise<ShoppingCart>;
    abstract decreaseProductsQuantity(decreaseProductsQuantityDto: DecreaseProductsQuantityDto): Promise<ShoppingCart>;
    abstract removeProducts(removeProductsDto: RemoveProductsDto): Promise<ShoppingCart>;
    //abstract getShoppingCart(): Promise<ShoppingCart[]>
    abstract getCartByUserId(id:string): Promise<ShoppingCart>;
    abstract searchALL(): Promise<ShoppingCart[]>;
}