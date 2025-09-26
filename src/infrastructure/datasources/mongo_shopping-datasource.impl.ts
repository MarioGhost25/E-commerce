import { ShoppingCartModel } from "../../data";
import { CreateShoppingCartDto, CustomError, ShoppingCart, ShoppingCartDatasource } from "../../domain";


export class MongoShoppingCartDatasourceImpl implements ShoppingCartDatasource {



    async createShoppingCart(createShoppingCartDto: CreateShoppingCartDto) {

        let shoppingCart = await ShoppingCartModel.findOne({
            userId: createShoppingCartDto.userId
        });

        try {
            // 2. Map the DTO products to the format needed by the model.
            const productsFromDto = createShoppingCartDto.products.map((item) => ({
                product: item.product,
                quantity: item.quantity,
                price: item.price, // Include the price
            }));
            // 3. If the cart doesn't exist, create a new one.
            if (!shoppingCart) {
                shoppingCart = new ShoppingCartModel({
                    user: createShoppingCartDto.userId,
                    products: productsFromDto, // Add the correctly formatted products
                });
            } else {
                // 4. If the cart exists, check for duplicate products.
                const incomingProductIds = new Set(
                    productsFromDto.map((p) => p.product)
                );
                const existingProductsInCart = shoppingCart.products.filter((p) =>
                    incomingProductIds.has(p.product.toString())
                );
                if (existingProductsInCart.length > 0) {
                    const existingIds = existingProductsInCart.map((p) =>
                        p.product.toString()
                    );
                    throw CustomError.badRequest(
                        `Products with these IDs are already in the cart: ${existingIds.join(
                            ", "
                        )
                        }. Please use the update endpoint to change quantity.`
                    );
                }
                // 5. If no duplicates, add the new products to the existing cart.
                shoppingCart.products.push(...productsFromDto);
            }
            // 6. Save the changes to the database.
            await shoppingCart.save();
            // 7. Return the ShoppingCart entity.
            return ShoppingCart.fromObject(shoppingCart);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer('Erros while creating or updating the cart');
        }
    }

    updateShoppingCart(): Promise<ShoppingCart> {
        throw new Error("Method not implemented.");
    }
    searchALL(): Promise<ShoppingCart[]> {
        throw new Error("Method not implemented.");
    }

    async getCartByUserId(userId: string): Promise<ShoppingCart> {
        try {
            const cart = await ShoppingCartModel.findOne({ user: userId }).populate('products.product');
    
            if (!cart) {
                throw CustomError.notFound('Shopping cart not found for this user.');
            }
    
            return ShoppingCart.fromObject(cart);
            
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer('Error while getting the shopping cart');
        }
    }
} 