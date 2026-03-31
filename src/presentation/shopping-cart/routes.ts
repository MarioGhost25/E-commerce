import { Router } from "express";
import { ShoppingCartController } from "./controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { ShoppingCartRepositoryImpl } from "../../infrastructure/repositories/shopping-cart-repository.impl";
import { MongoShoppingCartDatasourceImpl } from "../../infrastructure/datasources/mongo_shopping-datasource.impl";


export class ShoppingCartRoutes{

    static get routes(): Router{

        const router = Router();

        const datasource = new MongoShoppingCartDatasourceImpl();
        const shoppingRepository = new ShoppingCartRepositoryImpl(datasource);
        const controller = new ShoppingCartController(shoppingRepository);

        
        router.post('/', [AuthMiddleware.validateJWT], controller.createShoppingCart );
        router.post('/add-products', [AuthMiddleware.validateJWT], controller.addProducts);
        router.get('/get-cart-by-user-id', [AuthMiddleware.validateJWT], controller.getCartByUserId)
        router.delete('/', controller.removeProductOnShoppingCart );
        
        return router;

    }
}