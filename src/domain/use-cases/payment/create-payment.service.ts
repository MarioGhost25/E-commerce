import { CreatePaymentDto, PaymentEntity, PaymentRepository } from "../..";

interface CreatePaymentUseCase {
    execute(dto: CreatePaymentDto): Promise<PaymentEntity>;
}

export class CreatePaymentService implements CreatePaymentUseCase {

    constructor(private readonly paymentRepository: PaymentRepository ){}

    execute(dto: CreatePaymentDto): Promise<PaymentEntity> {
        return this.paymentRepository.createPayment(dto);
    }
}
