import { Router } from "express";
import { AuthRoutes } from "./auth/routes";


export class AppRoutes{
    
    static get routes(): Router{

        const router = Router();

        //*AuthController
        router.use('/Eco/auth', AuthRoutes.routes);



        return router;
    }

}