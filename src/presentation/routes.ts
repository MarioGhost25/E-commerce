import { Router } from "express";


import { AuthRoutes } from "./auth/routes";
import { ProductRoutes } from "./product/router";
import { ShoppingCartRoutes } from "./shopping-cart/routes";
import { PaymentRoutes } from "./payment/routes";
import { ImageRoute } from "./image/image.route";


export class AppRoutes {
    
    static get routes(): Router {

        const router = Router();

        //* AuthController
        router.use('/eco/auth', AuthRoutes.routes );
        //* ProductController
        router.use('/eco/products', ProductRoutes.routes );
        //* ShoppingCartController
        router.use('/eco/shopping', ShoppingCartRoutes.routes );
        //* PaymentController
        router.use('/eco/payment', PaymentRoutes.routes);
        //* ImageController
        router.use('/eco/image', ImageRoute.routes);

        return router;
    }

}