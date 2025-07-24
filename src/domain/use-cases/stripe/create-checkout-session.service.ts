import { CreatePaymentDto, PaymentGatewayRepository, PaymentRepository } from "../..";





export class CreateCheckoutSessionService {
    constructor(
        private stripeRepository: PaymentGatewayRepository,
        private paymentRepository: PaymentRepository
    ) { }

    async execute(createPaymentDto: CreatePaymentDto, amount: number, currency: string): Promise<string> {

        // We can run both promises at the same time for better performance
        const [sessionId] = await Promise.all([
            this.stripeRepository.createCheckoutSession(amount, currency),
            this.paymentRepository.create(createPaymentDto)
        ]);

        return sessionId;
    }
}