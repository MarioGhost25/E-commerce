import { PaymentRepository, CreatePaymentDto, PaymentEntity, PaymentDatasource } from "../../domain";

export class PaymentRepositoryImpl implements PaymentRepository{

    constructor(
        private readonly paymentDatasource : PaymentDatasource, 
    ) { }
    createPayment(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {
       return this.paymentDatasource.create(createPaymentDto);
    }
    findByOrderId(orderId: string): Promise<PaymentEntity> {
        return this.paymentDatasource.findByOrderId(orderId);
    }

    
}
