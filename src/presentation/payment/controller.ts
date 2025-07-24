import { Request, Response } from "express";
import { CreateCheckoutSessionService, CreatePaymentDto, CustomError, PaymentGatewayRepository, PaymentRepository } from "../../domain";

export class PaymentController {

    constructor(
        private readonly stripeRepository: PaymentGatewayRepository,
        private readonly paymentRepository: PaymentRepository

    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    };



    paymentController = (req: Request, res: Response) => {
        const [error, createPaymentDto]= CreatePaymentDto.createPayment({
            ...req.body,
            amount: req.body.amount,
            currency: req.body.currency,
        });

        if (error) {
            res.status(400).json({ error });
            return;
        }

        new CreateCheckoutSessionService(this.stripeRepository, this.paymentRepository)
            .execute(createPaymentDto!, createPaymentDto!.amount, createPaymentDto!.currency)
            .then(sessionId => res.json({ sessionId }))
            .catch(error => this.handleError(error, res));

    }


}