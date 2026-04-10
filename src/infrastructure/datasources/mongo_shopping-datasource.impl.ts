import { ProductModel, ShoppingCartModel, UserModel } from "../../data";
import { CreateShoppingCartDto, CustomError, ShoppingCart, ShoppingCartDatasource, AddProductsDto, RemoveProductsDto, DecreaseProductsQuantityDto } from "../../domain";


export class MongoShoppingCartDatasourceImpl implements ShoppingCartDatasource {

    async createShoppingCart(createShoppingCartDto: CreateShoppingCartDto) {
        try {
            
            let [user, shoppingCart ] = await Promise.all([
                UserModel.findById(createShoppingCartDto.userId),
                ShoppingCartModel.findOne({ user: createShoppingCartDto.userId })
            ]);

            if (!user) {
                throw CustomError.notFound('User not found');
            }

            const productsFromDb: Array<{ product: string; quantity: number; price: number }> = [];

            for (const item of createShoppingCartDto.products) {
                const productSchema = await ProductModel.findById(item.product);

                if (!productSchema) {
                    throw CustomError.notFound(`Product not found: ${item.product}`);
                }

                productsFromDb.push({
                    product: item.product,
                    quantity: item.quantity,
                    price: productSchema.price,
                });
            }

            if (shoppingCart) {
                throw CustomError.badRequest('Shopping cart already exists for this user. Use addProducts endpoint.');
            }

            shoppingCart = new ShoppingCartModel({
                user: createShoppingCartDto.userId,
                products: productsFromDb,
            });
            
            
            shoppingCart.total = shoppingCart.products.reduce(
                (sum: number, item: any) => sum + (item.price * item.quantity),
                0
            );
            
            user.cartId = shoppingCart._id;

            await Promise.all([ user.save(), shoppingCart.save() ]);

            return ShoppingCart.fromObject(shoppingCart);

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer('Errors while creating or updating the cart');
        }
    }

    async addProducts(addProductsDto: AddProductsDto) {
        try {
            const shoppingCart = await ShoppingCartModel.findOne({ user: addProductsDto.userId });

            if (!shoppingCart) {
                throw CustomError.notFound('Shopping cart not found for this user.');
            }

            for (const item of addProductsDto.products) {
                const productSchema = await ProductModel.findById(item.product);

                if (!productSchema) {
                    throw CustomError.notFound(`Product not found: ${item.product}`);
                }

                const existingItem = shoppingCart.products.find(
                    (cartItem: any) => cartItem.product.toString() === item.product
                );

                if (existingItem) {
                    existingItem.quantity += item.quantity;
                    existingItem.price = productSchema.price;
                } else {
                    shoppingCart.products.push({
                        product: item.product,
                        quantity: item.quantity,
                        price: productSchema.price,
                    });
                }
            }

            shoppingCart.total = shoppingCart.products.reduce(
                (sum: number, item: any) => sum + (item.price * item.quantity),
                0
            );

            await shoppingCart.save();

            return ShoppingCart.fromObject(shoppingCart);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer('Error while adding products to shopping cart');
        }
    }

    async decreaseProductsQuantity(decreaseProductsQuantityDto: DecreaseProductsQuantityDto) {

        try {
            const shoppingCart = await ShoppingCartModel.findOne({ user: decreaseProductsQuantityDto.userId });

            if (!shoppingCart) {
                throw CustomError.notFound('Shopping cart not found for this user.');
            }

            for (const item of decreaseProductsQuantityDto.products) {
                const productSchema = await ProductModel.findById(item._id);

                if (!productSchema) {
                    throw CustomError.notFound(`Product not found: ${item._id}`);
                }
                const existingItem = shoppingCart.products.find(
                    (cartItem: any) => cartItem.product.toString() === item._id
                );

                if (!existingItem) {
                    throw CustomError.notFound(`Product with id ${item._id} not found in cart`);
                }
                if (existingItem.quantity < item.quantity) {
                    throw CustomError.badRequest(`Cannot decrease quantity for product ${item._id} by ${item.quantity} as it exceeds the current quantity in the cart`);
                }

                existingItem.quantity -= item.quantity;

            }

            shoppingCart.total = shoppingCart.products.reduce(
                (sum: number, item: any) => sum + (item.price * item.quantity),
                0
            );

            await shoppingCart.save();
            return ShoppingCart.fromObject(shoppingCart);

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer('Error while adding products to shopping cart');
        }
    }

    async removeProducts(removeProductsDto: RemoveProductsDto) {
        try {
            const { userId, products } = removeProductsDto;

            const cart = await ShoppingCartModel.findOne({ user: userId });
            if (!cart) {
                throw CustomError.notFound('Shopping cart not found for this user.');
            }

            for (const item of products) {

                const product = cart.products.id(item._id);

                if (!product) {
                    throw CustomError.notFound(
                        `Product with id ${item._id} not found in cart`
                    );
                }

                cart.total -= product.price * product.quantity;

                product.deleteOne();
            }

            await cart.save();

            return ShoppingCart.fromObject(cart);


        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer('Error while removing products from shopping cart');
        }
    }

    searchALL(): Promise<ShoppingCart[]> {
        throw new Error("Method not implemented.");
    }

    async getCartByUserId(userId: string) {
        try {
            const cart = await ShoppingCartModel.findOne({ user: userId })
                .populate('products.product', '_id name images');

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