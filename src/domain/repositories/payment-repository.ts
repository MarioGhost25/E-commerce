import { CreatePaymentDto, PaymentEntity } from "..";


export abstract class PaymentRepository {
  abstract create(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity>;
}
