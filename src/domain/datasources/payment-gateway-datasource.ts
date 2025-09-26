import { LineItem } from "../../infrastructure/datasources/mongo_stripe-gateway-datasource.impl";


export abstract class PaymentGatewayDatasource {
    abstract createCheckoutSession(lineItems: LineItem[], currency: string, metadata: { [key: string]: any }): Promise<string>;
}
