import { CreatePaymentDto, PaymentEntity } from "..";


export abstract class PaymentRepository {
  abstract createPayment(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity>;
  abstract findByOrderId(orderId: string): Promise<PaymentEntity>
}