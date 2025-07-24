import { PaymentModel } from "../../data";
import { CreatePaymentDto, PaymentDatasource, PaymentEntity } from "../../domain";

export class PaymentDatasourceImpl implements PaymentDatasource{
    async create(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {
        const payment = await PaymentModel.create(createPaymentDto);
        const paymentObj = payment.toObject();
        return {
            ...paymentObj,
            userId: paymentObj.userId.toString(),
            id: paymentObj._id.toString(),
        } as PaymentEntity;
    }

}
