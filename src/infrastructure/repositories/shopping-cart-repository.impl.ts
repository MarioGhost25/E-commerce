import { AddProductsDto, CreateShoppingCartDto, ShoppingCart, ShoppingCartDatasource, ShoppingCartRepository } from "../../domain";


export class ShoppingCartRepositoryImpl implements ShoppingCartRepository{

    constructor(
        private readonly shoppingCartDatasource: ShoppingCartDatasource,
    ){}
    
    createShoppingCart(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
        return this.shoppingCartDatasource.createShoppingCart(createShoppingCartDto);
    }
    addProducts(addProductsDto: AddProductsDto): Promise<ShoppingCart> {
        return this.shoppingCartDatasource.addProducts(addProductsDto)
    }
    searchALL(): Promise<ShoppingCart[]> {
        throw new Error("Method not implemented.");
    }
    getCartByUserId(id: string): Promise<ShoppingCart> {
        return this.shoppingCartDatasource.getCartByUserId(id);
    }
}