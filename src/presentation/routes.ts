import { Router } from "express";

import { AuthRoutes } from "./auth/routes";
import { ProductRoutes } from "./product/router";


export class AppRoutes {
    
    static get routes(): Router {

        const router = Router();

        //* AuthController
        router.use('/eco/auth', AuthRoutes.routes );
        //* ProductController
        router.use('/eco/products', ProductRoutes.routes );



        return router;
    }

}