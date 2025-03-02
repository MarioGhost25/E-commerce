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

        
        router.post('/:id', [AuthMiddleware.validateJWT], controller.createProductOnShoppingCart );
        router.delete('/', controller.removeProductOnShoppingCart );
        
        return router;

    }
}