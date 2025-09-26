import Stripe from "stripe";
import { PaymentGatewayDatasource } from "../../domain";
import { envs } from "../../config";

const stripe = new Stripe(envs.STRIPE_SECRET_KEY);

export type LineItem = {
    name: string;
    quantity: number;
    price: number; 
};

export class StripeDatasourceImpl implements PaymentGatewayDatasource {

    async createCheckoutSession(lineItems: LineItem[], currency: string, metadata: { [key: string]: any }): Promise<string> {

        const line_items = lineItems.map(item => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // The price must be in cents
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${envs.WEBSERVICE_URL}/payment/success`,
            cancel_url: `${envs.WEBSERVICE_URL}/payment/cancel`,
            metadata: metadata,
        });

        return session.id;
    }
}
