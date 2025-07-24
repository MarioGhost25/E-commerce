import { CreatePaymentDto, PaymentEntity } from "..";


export abstract class PaymentDatasource {
  abstract create(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity>;
}
