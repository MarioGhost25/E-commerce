import { PaymentGatewayDatasource, PaymentGatewayRepository } from "../../domain";
import { LineItem } from "../datasources/mongo_stripe-gateway-datasource.impl";


export class PaymentGatewayRepositoryImpl implements PaymentGatewayRepository{
    constructor(private readonly paymentGatewayDatasource: PaymentGatewayDatasource){}

    
    createCheckoutSession(lineItems: LineItem[], currency: string, metadata: { [key: string]: any }): Promise<string> {
        return this.paymentGatewayDatasource.createCheckoutSession(lineItems, currency, metadata);
    }

    
}