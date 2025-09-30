import { raw, Router, } from 'express';
import { PaymentController } from './controller';
import { ShoppingCartRepositoryImpl } from '../../infrastructure/repositories/shopping-cart-repository.impl'
import { MongoShoppingCartDatasourceImpl } from '../../infrastructure/datasources/mongo_shopping-datasource.impl';

import { PaymentRepositoryImpl } from '../../infrastructure/repositories/payment-repository.impl';
import { MongoStripeDatasourceImpl } from '../../infrastructure/datasources/mongo_stripe-gateway-datasource.impl';
import { AuthMiddleware } from '../middleware/auth.middleware';




export class PaymentRoutes {

  static get routes(): Router {

    const router = Router();

    // --- DEPENDENCIES ---

    // 1. Shopping Cart Dependencies (used to get items for checkout)
    const shoppingCartDatasource = new MongoShoppingCartDatasourceImpl();
    const shoppingCartRepository = new ShoppingCartRepositoryImpl(shoppingCartDatasource);

    const paymentDatasource = new MongoStripeDatasourceImpl();
    const paymentRepository = new PaymentRepositoryImpl(paymentDatasource);





    // 4. Controller with all dependencies correctly injected
    const controller = new PaymentController(
      shoppingCartRepository,
      paymentRepository,
    );

    // routes
    router.post('/', [AuthMiddleware.validateJWT], controller.createPayment);         // POST /payments
    router.post('/confirm', controller.confirmPayment); // POST /payments/confirm
    router.post('/webhook', raw({ type: 'application/json' }), controller.stripeWebhook);


    return router;
  }
}
