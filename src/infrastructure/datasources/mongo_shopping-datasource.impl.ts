import { ShoppingCartModel } from "../../data";
import { CreateShoppingCartDto, CustomError, ShoppingCart, ShoppingCartDatasource } from "../../domain";


export class MongoShoppingCartDatasourceImpl implements ShoppingCartDatasource {

    async createShoppingCart(createShoppingCartDto: CreateShoppingCartDto) {

        // Buscamos el carrito de compras por el userId.
        let shoppingCart = await ShoppingCartModel.findOne({ userId: createShoppingCartDto.userId });

        try {
            // Si el carrito no existe, lo creamos.
            if (!shoppingCart) {
                const productsToAdd = createShoppingCartDto.productIds.map(id => ({
                    productId: id,
                    quantity: createShoppingCartDto.quantity,
                }));

                shoppingCart = new ShoppingCartModel({
                    userId: createShoppingCartDto.userId,
                    products: productsToAdd,
                });
            } else {
                // Si el carrito ya existe, verificamos que los productos no estén ya añadidos.
                const incomingProductIds = new Set(createShoppingCartDto.productIds);
                const existingProductsInCart = shoppingCart.products.filter(p => incomingProductIds.has(p.productId.toString()));

                if (existingProductsInCart.length > 0) {
                    const existingIds = existingProductsInCart.map(p => p.productId.toString());
                    throw CustomError.badRequest(`Products with these IDs are already in the cart: ${existingIds.join(', ')}. Please use the update endpoint to change quantity.`);
                }

                // Si los productos no existen, los añadimos.
                const productsToAdd = createShoppingCartDto.productIds.map(id => ({
                    productId: id,
                    quantity: createShoppingCartDto.quantity,
                }));
                shoppingCart.products.push(...productsToAdd);
            }

            // Guardamos los cambios en la base de datos.
            await shoppingCart.save();

            // Retornamos la entidad del carrito de compras.
            return ShoppingCart.fromObject(shoppingCart);


        } catch (error) {
            // Si el error ya es un CustomError, lo relanzamos para que el controlador lo maneje.
            if (error instanceof CustomError) {
                throw error;
            }
            // Es una buena práctica registrar el error original para depuración.
            console.error(error); 
            throw CustomError.internalServer('Error while creating or updating shopping cart');
        }


    }
    updateShoppingCart(): Promise<ShoppingCart> {
        throw new Error("Method not implemented.");
    }
    searchALL(): Promise<ShoppingCart[]> {
        throw new Error("Method not implemented.");
    }

} 