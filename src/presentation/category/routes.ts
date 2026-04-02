import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { MongoCategoryDatasourceImpl } from "../../infrastructure/datasources/mongo_category-datasource.impl";
import { CategoryRepositoryImpl } from "../../infrastructure/repositories/category-repository.impl";
import { CategoryController } from "./controller";


export class CategoryRoutes{

    static get routes(): Router{

        const router = Router();

        const datasource = new MongoCategoryDatasourceImpl();
        const shoppingRepository = new CategoryRepositoryImpl(datasource);
        const controller = new CategoryController(shoppingRepository);

        
        router.post('/', [AuthMiddleware.validateJWT], controller.createCategory );
        router.get('/', controller.getAllCategories)
        
        return router;

    }
}