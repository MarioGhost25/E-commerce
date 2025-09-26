import { PaymentModel } from "../../data";
import { CreatePaymentDto, CustomError, PaymentDatasource, PaymentEntity } from "../../domain";

export class PaymentDatasourceImpl implements PaymentDatasource {

    async create(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {
        // Lógica de idempotencia: check if payment exists first
        const existingPayment = await this.findByOrderId(createPaymentDto.order);
        if (existingPayment) {
            // If it exists, return it without creating a duplicate.
            return existingPayment;
        }

        try {
            const payment = new PaymentModel({
                ...createPaymentDto,
                status: 'succeeded' // The payment is created upon successful checkout
            });
            
            await payment.save();
            
            return PaymentEntity.fromObject(payment);
            
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Error creating payment');
        }
    }

    /**
     * Finds a payment by its unique order ID.
     * Returns the PaymentEntity or null if not found.
     */
    async findByOrderId(orderId: string): Promise<PaymentEntity> {
        const payment = await PaymentModel.findOne({ order: orderId });
        if (!payment) throw CustomError.notFound('Payment not found')
        return PaymentEntity.fromObject(payment);
    }
}
