import { PaymentGatewayRepository } from "../..";
import { LineItem } from "../../../infrastructure/datasources/mongo_stripe-gateway-datasource.impl";


export interface CreateCheckoutSessionUseCase {
    execute(lineItems: LineItem[], currency: string, metadata: { [key: string]: any }): Promise<string>;
}

export class CreateCheckoutSessionService implements CreateCheckoutSessionUseCase {
    constructor(
        private stripeRepository: PaymentGatewayRepository,
    ) { }

    execute(lineItems: LineItem[], currency: string, metadata: { [key: string]: any }): Promise<string> {
            return this.stripeRepository.createCheckoutSession(lineItems, currency, metadata);
    }
}