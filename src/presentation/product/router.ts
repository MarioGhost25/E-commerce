import { Router } from "express";
import { ProductController } from "./controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { MongoProductDatasourceImpl } from "../../infrastructure/datasources/mongo_product-datasource.impl";
import { ProductRepositoryImpl } from "../../infrastructure/repositories/product-repositort.impl";


export class ProductRoutes {

    static get routes(): Router{

        const router = Router();

        const datasource = new MongoProductDatasourceImpl();
        const productRepository = new ProductRepositoryImpl( datasource );
        const controller = new ProductController( productRepository );

        router.post('/',[AuthMiddleware.validateJWT], controller.createProduct );
        router.get('/', controller.search );
        router.put('/:id', controller.updateProduct );

        return router;

    }
}