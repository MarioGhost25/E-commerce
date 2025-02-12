
import { Router } from "express";
import { AuthController } from "./controller";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user-repository.impl";
import { MongoUserDatasourceImpl } from "../../infrastructure/datasources/mongo_user-datasource.impl";


export class AuthRoutes{
    
    static get routes(): Router{

        const router = Router();
        
        const datasource = new MongoUserDatasourceImpl();
        const userRepository = new UserRepositoryImpl( datasource );
        const controller = new AuthController( userRepository );


        router.post('/login', controller.loginUser );
        router.post('/register', controller.createUser );



        return router;
    }

}