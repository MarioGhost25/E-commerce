import { CreateShoppingCartDto, ShoppingCart, AddProductsDto } from "..";


export abstract class ShoppingCartDatasource {
    abstract createShoppingCart(createShoppingCartDto: CreateShoppingCartDto ): Promise<ShoppingCart>;
    abstract addProducts(addProductsDto: AddProductsDto ): Promise<ShoppingCart>;
    abstract getCartByUserId(id:string): Promise<ShoppingCart>;
    abstract searchALL(): Promise<ShoppingCart[]>;
}