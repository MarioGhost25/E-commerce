import { Request, Response } from 'express';
import Stripe from 'stripe';
import { CreatePaymentDto, CreatePaymentService, CustomError, PaymentRepository, ShoppingCartRepository } from '../../domain';
import { envs } from '../../config';


export class PaymentController {
  
  constructor(
    private readonly shoppingCartRepository: ShoppingCartRepository,
    private readonly paymentRepository: PaymentRepository
  ) { }
  
  private  handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error); // Log the error for debugging purposes
    return res.status(500).json({ error: 'Internal Server Error' });
  };
  
  createPayment = async (req: Request, res: Response): Promise<void> => {

    const [error, createPaymentDto] = CreatePaymentDto.createPayment({
      ...req.body,
      user: req.body.user.id // Asegurarse de que el usuario esté autenticado y disponible en req.body.user
    })
    
    if (error) {
      res.status(400).json({ error });
      return;
    }

    try {
      const shoppingCart = await this.shoppingCartRepository.getCartByUserId(createPaymentDto!.user);
      
      if (!shoppingCart || shoppingCart.products.length === 0) {
        throw CustomError.badRequest('Shopping cart is empty or does not exist.');
      }

      const sessionId = await new CreatePaymentService(this.paymentRepository).execute(createPaymentDto!);

      res.status(201).json({ sessionId });

    } catch (error) {
      this.handleError(error, res);
    }
    }

  // Method to handle Stripe Webhook events
  stripeWebhook = async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers['stripe-signature'] as string;

    let event: Stripe.Event;
    try {
      event = Stripe.webhooks.constructEvent(
        req.body,
        sig,
        envs.STRIPE_SECRET_KEY
      );
    } catch (err: any) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return; // 👈 detiene ejecución si no se pudo construir el evento
    }
    
    // Manejo del evento checkout.session.completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, orderId } = session.metadata || {};

      if (!userId || !orderId) {
        res.status(400).json({ error: 'Missing metadata in Stripe session' });
        return; // 👈 detenemos si faltan datos
      }
      
      const paymentDto = {
        user: userId,
        order: orderId,
        stripePaymentIntentId: session.payment_intent as string,
        amount: session.amount_total! / 100,
        currency: session.currency!,
      };

      try {
        await new CreatePaymentService(this.paymentRepository).execute(paymentDto);
      } catch (error) {
        console.error('Error saving payment:', error);
        res.status(500).json({ error: 'Error processing payment' });
        return; // 👈 detenemos si falla la persistencia
      }
    }

    res.status(200).json({ received: true });
  };

  confirmPayment(arg0: string, confirmPayment: any) {
    throw new Error('Method not implemented.');
  }

}

