import Stripe from "stripe";
import { CreatePaymentDto, PaymentDatasource, PaymentEntity } from "../../domain";
import { envs } from "../../config"

const stripe = new Stripe(envs.STRIPE_SECRET_KEY);


export class MongoStripeDatasourceImpl implements PaymentDatasource {
    async createPayment(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {

        const { amount, currency } = createPaymentDto;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency,
            
        });

        return PaymentEntity.fromObject(paymentIntent);
    }
    confirmPayment(dto: { gatewayPaymentId: string; paymentMethodId?: string; }): Promise<PaymentEntity> {
        throw new Error("Method not implemented.");
    }
    getPaymentStatus(paymentIntentId: string): Promise<PaymentEntity> {
        throw new Error("Method not implemented.");
    }




}
