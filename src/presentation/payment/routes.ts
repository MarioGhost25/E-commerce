import { Router } from 'express';
import { PaymentController } from './controller';
import { ShoppingCartRepositoryImpl } from '../../infrastructure/repositories/shopping-cart-repository.impl'
import { MongoShoppingCartDatasourceImpl } from '../../infrastructure/datasources/mongo_shopping-datasource.impl';
import { StripeDatasourceImpl } from '../../infrastructure/datasources/mongo_stripe-gateway-datasource.impl';
import { CreatePayment } from '../../domain/use-cases/payment/create-payment';
import { PaymentRepositoryImpl } from '../../infrastructure/repositories/payment-repository.impl';
import { PaymentDatasourceImpl } from '../../infrastructure/datasources/mongo_payment-datasource.impl';
import { CreateCheckoutSessionService } from '../../domain';
import { PaymentGatewayRepositoryImpl } from '../../infrastructure/repositories/stripe-gateway-repository.impl';



export class PaymentRoutes {
  static get routes(): Router {
    const router = Router();

    // --- DEPENDENCIES ---

    // 1. Shopping Cart Dependencies (used to get items for checkout)
    const shoppingCartDatasource = new MongoShoppingCartDatasourceImpl();
    const shoppingCartRepository = new ShoppingCartRepositoryImpl(shoppingCartDatasource);

    // 2. Stripe Payment Gateway Dependencies (for creating the checkout session)
    const stripeDatasource = new StripeDatasourceImpl();
    const paymentGatewayRepository = new PaymentGatewayRepositoryImpl(stripeDatasource);
    const createCheckoutSessionUseCase = new CreateCheckoutSessionService(paymentGatewayRepository);

    // 3. Internal Payment DB Dependencies (for saving the payment record after webhook confirmation)
    const paymentDatasource = new PaymentDatasourceImpl();
    const paymentRepository = new PaymentRepositoryImpl(paymentDatasource);
    const createPaymentUseCase = new CreatePayment(paymentRepository);

    // 4. Controller with all dependencies correctly injected
    const controller = new PaymentController(
      shoppingCartRepository,
      createCheckoutSessionUseCase, // Correct Use Case for creating the session
      createPaymentUseCase          // Correct Use Case for saving the payment
    );

    // routes
    router.post('/create-checkout-session', controller.createCheckout);
    router.post('/webhook', controller.stripeWebhook);
    

    return router;
  }
}
