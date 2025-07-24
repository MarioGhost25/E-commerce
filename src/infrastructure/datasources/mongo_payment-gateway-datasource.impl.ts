import Stripe from "stripe";
import { PaymentGatewayRepository } from "../../domain";
import { envs } from "../../config";

const stripe = new Stripe(envs.STRIPE_SECRET_KEY)

export class StripeDatasource implements PaymentGatewayRepository {

    async createCheckoutSession(amount: number, currency: string) {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency,
                    product_data: {
                        name: 'E-Commerce Purchase',
                    },
                    unit_amount: amount,
                },
                quantity: 1,
            }],
            success_url: 'http://localhost:2000/success',
            cancel_url: 'http://localhost:2000/cancel',
        });

        return session.id;
    }

}