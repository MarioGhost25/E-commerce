import { Router } from "express";
import { PaymentController } from "./controller";
import { StripeDatasource } from "../../infrastructure/datasources/mongo_payment-gateway-datasource.impl";
import { PaymentGatewayRepositoryImpl } from "../../infrastructure/repositories/payment-gateway-repository.impl";
import { PaymentRepositoryImpl } from "../../infrastructure/repositories/payment-repository.impl";
import { PaymentDatasourceImpl } from "../../infrastructure/datasources/mongo_payment-datasource.impl";

export class PaymentRoutes{

    static get routes(): Router{

        const router = Router();

        const stripeDatasource = new StripeDatasource();
        const paymentDatasource = new PaymentDatasourceImpl();
        const stripeRepository = new PaymentGatewayRepositoryImpl(stripeDatasource);
        const paymentRepository = new PaymentRepositoryImpl(paymentDatasource);
        const controller = new PaymentController(stripeRepository, paymentRepository);

    

        
        router.post('/checkout', controller.paymentController );
        
        
        return router;

    }
}