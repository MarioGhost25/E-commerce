import { CreatePaymentDto, PaymentEntity, PaymentRepository } from "../../../domain";

interface CreatePaymentUseCase {
    execute(dto: CreatePaymentDto): Promise<PaymentEntity>;
}

export class CreatePayment implements CreatePaymentUseCase {

    constructor(private readonly paymentRepository: PaymentRepository) { }

    execute(dto: CreatePaymentDto): Promise<PaymentEntity> {
        return this.paymentRepository.createPayment(dto);
    }
}
