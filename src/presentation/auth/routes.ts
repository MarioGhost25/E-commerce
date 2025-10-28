
import { Router } from "express";
import { AuthController } from "./controller";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user-repository.impl";
import { MongoUserDatasourceImpl } from "../../infrastructure/datasources/mongo_user-datasource.impl";
import { AuthMiddleware } from "../middleware/auth.middleware";


export class AuthRoutes{
    
    static get routes(): Router{

        const router = Router();
        
        const datasource = new MongoUserDatasourceImpl();
        const userRepository = new UserRepositoryImpl( datasource );
        const controller = new AuthController( userRepository );


        router.get('/:id', controller.getUserById )
        router.post('/login', controller.loginUser );
        router.post('/register', controller.createUser );
        router.put('/update-password', [AuthMiddleware.validateJWT], controller.updatePassword);



        return router;
    }

}