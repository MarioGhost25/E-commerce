import { Router } from "express";
import { AuthController } from "./controller";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user-repository.impl";
import { MongoUserDatasourceImpl } from "../../infrastructure/datasources/mongo_user-datasource.impl";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { RefreshTokenRepositoryImpl } from "../../infrastructure/repositories/refresh-token-repository.impl";
import { MongoRefreshTokenDatasourceImpl } from "../../infrastructure/datasources/mongo_refresh-token-datasource.impl";


export class AuthRoutes{
    
    static get routes(): Router{

        const router = Router();
        
        const datasource = new MongoUserDatasourceImpl();
        const refreshDatasource = new MongoRefreshTokenDatasourceImpl();

        const userRepository = new UserRepositoryImpl( datasource );
        const refreshTokenRepository = new RefreshTokenRepositoryImpl( refreshDatasource );

        const controller = new AuthController( userRepository, refreshTokenRepository );


        router.get('/:id', controller.getUserById )
        router.post('/login', controller.loginUser );
        router.post('/register', controller.createUser );
        router.post('/refresh', controller.refreshToken );
        router.post('/logout', controller.logout );
        router.put('/update-password', [AuthMiddleware.validateJWT], controller.updatePassword);



        return router;
    }

}
