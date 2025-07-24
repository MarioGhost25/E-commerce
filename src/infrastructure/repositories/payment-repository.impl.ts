
import { CreatePaymentDto, PaymentDatasource, PaymentEntity, PaymentRepository } from "../../domain";


export class PaymentRepositoryImpl implements PaymentRepository{

    constructor(
        private readonly paymentDatasource: PaymentDatasource
    ){}

    create(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {
        return this.paymentDatasource.create(createPaymentDto);
    }
    
}