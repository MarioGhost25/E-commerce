import { PaymentGatewayDatasource, PaymentGatewayRepository } from "../../domain";


export class PaymentGatewayRepositoryImpl implements PaymentGatewayRepository{
    constructor(private readonly paymentGatewayDatasource: PaymentGatewayDatasource){}

    
    createCheckoutSession(amount: number, currency: string): Promise<string> {
        return this.paymentGatewayDatasource.createCheckoutSession(amount, currency);
    }

    
}