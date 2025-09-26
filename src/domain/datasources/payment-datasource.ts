import { CreatePaymentDto, PaymentEntity } from "..";


export abstract class PaymentDatasource {
  abstract create(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity>;
  abstract findByOrderId(orderId: string): Promise<PaymentEntity>
}
