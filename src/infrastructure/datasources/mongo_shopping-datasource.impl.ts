import { ShoppingCartModel } from "../../data";
import { CreateShoppingCartDto, CustomError, ShoppingCart, ShoppingCartDatasource } from "../../domain";


export class MongoShoppingCartDatasourceImpl implements ShoppingCartDatasource {

    async createShoppingCart(createShoppingCartDto: CreateShoppingCartDto) {

        let shoppingCartExist = await ShoppingCartModel.findOne({ userId: createShoppingCartDto.userId });

        try {

            const productId = createShoppingCartDto.productIds.map((id: string) => ({
                productId: id, // Mongoose lo convierte automáticamente a ObjectId
                quantity: createShoppingCartDto.quantity, // Asignar la cantidad
            }));

            // Crear el carrito de compras
            if (!shoppingCartExist) {
                shoppingCartExist = new ShoppingCartModel({
                    userId: createShoppingCartDto.userId, // Mongoose lo convierte automáticamente a ObjectId
                    products: productId, // Array de productos con la estructura correcta
                });
                

            }
            else {
                // Si el carrito ya existe, se añaden los productos que no estén en el carrito
                // Filtrar los productos que aún no están en el carrito
                const newProducts = createShoppingCartDto.productIds.filter(
                    (productId) => !shoppingCartExist!.products.some(p => p.productId.toString() === productId)
                  );
              
                  // Agregar los nuevos productos al carrito
                shoppingCartExist.products.push(...newProducts.map(id => ({ productId: id, quantity: createShoppingCartDto.quantity })));
                
            }

            await shoppingCartExist.save();

            return ShoppingCart.fromObject(shoppingCartExist);


        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }


    }
    updateShoppingCart(): Promise<ShoppingCart> {
        throw new Error("Method not implemented.");
    }
    searchALL(): Promise<ShoppingCart[]> {
        throw new Error("Method not implemented.");
    }

} 