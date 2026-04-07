import { AddProductsDto, CreateShoppingCartDto, DecreaseProductsQuantityDto, RemoveProductsDto, ShoppingCart, ShoppingCartDatasource, ShoppingCartRepository } from "../../domain";


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
    decreaseProductsQuantity(decreaseProductsQuantityDto: DecreaseProductsQuantityDto): Promise<ShoppingCart> {
        return this.shoppingCartDatasource.decreaseProductsQuantity(decreaseProductsQuantityDto);
    }
    removeProducts(removeProductsDto: RemoveProductsDto): Promise<ShoppingCart> {
        return this.shoppingCartDatasource.removeProducts(removeProductsDto);
    }
    searchALL(): Promise<ShoppingCart[]> {
        throw new Error("Method not implemented.");
    }
    getCartByUserId(id: string): Promise<ShoppingCart> {
        return this.shoppingCartDatasource.getCartByUserId(id);
    }
}