import { PaymentRepository, CreatePaymentDto, PaymentEntity, PaymentDatasource } from "../../domain";

export class PaymentRepositoryImpl implements PaymentRepository{

    constructor(
        private readonly paymentDatasource : PaymentDatasource, 
    ) { }
    createPayment(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {
        return this.paymentDatasource.createPayment(createPaymentDto);
    }
    confirmPayment(dto: { gatewayPaymentId: string; paymentMethodId?: string; }): Promise<PaymentEntity> {
        throw new Error("Method not implemented.");
    }
    getPaymentStatus(paymentIntentId: string): Promise<PaymentEntity> {
        throw new Error("Method not implemented.");
    }
    

    
}
