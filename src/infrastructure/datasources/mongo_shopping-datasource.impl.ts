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
                price: item.price, 
            }));

            const totalPrice = productsFromDto.reduce((sum: number, item) => sum + (item.price * item.quantity), 0);
            // 3. If the cart doesn't exist, create a new one.
            if (!shoppingCart) {
                shoppingCart = new ShoppingCartModel({
                    user: createShoppingCartDto.userId,
                    products: productsFromDto,// Add the correctly formatted products
                    total: totalPrice
                });
            }
            // 4. Save the changes to the database.
            await shoppingCart.save();
            // 5. Return the ShoppingCart entity.
            return ShoppingCart.fromObject(shoppingCart);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer('Erros while creating or updating the cart');
        }
    }

    async updateShoppingCart(): Promise<ShoppingCart> {
        throw new Error('not implemented')
        //     // 4. If the cart exists, check for duplicate products.
        //     const incomingProductIds = new Set(
        //         productsFromDto.map((p) => p.product)
        //     );
        //     const existingProductsInCart = shoppingCart.products.filter((p) =>
        //         incomingProductIds.has(p.product.toString())
        //     );
        //     if (existingProductsInCart.length > 0) {
        //         const existingIds = existingProductsInCart.map((p) =>
        //             p.product.toString()
        //         );
        //         throw CustomError.badRequest(
        //             `Products with these IDs are already in the cart: ${existingIds.join(
        //                 ", "
        //             )
        //             }. Please use the update endpoint to change quantity.`
        //         );
        //     }
        //     // 5. If no duplicates, add the new products to the existing cart.
        //     shoppingCart.products.push(...productsFromDto);
        // }

    }
    searchALL(): Promise<ShoppingCart[]> {
        throw new Error("Method not implemented.");
    }

    async getCartByUserId(userId: string){
        try {
            const cart = await ShoppingCartModel.findOne({ user: userId })
            .populate('products.product', 'name images');

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