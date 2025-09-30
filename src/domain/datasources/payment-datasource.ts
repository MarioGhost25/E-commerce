import { CreatePaymentDto, PaymentEntity } from "..";


export abstract class PaymentDatasource {
  abstract createPayment(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity>;
  abstract confirmPayment(dto: { gatewayPaymentId: string; paymentMethodId?: string; }): Promise<PaymentEntity>;
  abstract getPaymentStatus(paymentIntentId: string ): Promise<PaymentEntity>;
  
}