import { PaymentEntity, PaymentRepository } from "../..";


interface FindByOrderIdPaymentUseCase {
    execute(orderId: string): Promise<PaymentEntity>;
}

export class FindByOrderIdPayment implements FindByOrderIdPaymentUseCase {

    constructor(private readonly paymentRepository: PaymentRepository) { }

    execute(orderId: string): Promise<PaymentEntity> {
        return this.paymentRepository.findByOrderId(orderId);
    }
}