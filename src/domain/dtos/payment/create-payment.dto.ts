
import { Types } from 'mongoose';

export class CreatePaymentDto {

    private constructor(
            public readonly user: string,
            public readonly order: string,
            public readonly amount: number,
            public readonly currency: string,
            public readonly stripePaymentIntentId: string,
        ) {}
    
        public static createPayment(object: { [key: string]: any }): [string?, CreatePaymentDto?] {
            const { user, order, amount, currency, stripePaymentIntentId } = object;
    
            // 1. Required Fields Validation
            if (!user) return ["Missing user ID", undefined];
            if (!order) return ["Missing order ID", undefined];
            if (amount === undefined) return ["Missing amount", undefined];
            if (!currency) return ["Missing currency", undefined];
            if (!stripePaymentIntentId) return ["Missing Stripe Payment Intent ID", undefined];
            // 2. Type and Value Validation
            if (!Types.ObjectId.isValid(user)) {
                return ["Invalid user ID", undefined];
            }
    
            if (!Types.ObjectId.isValid(order)) {
                return ["Invalid order ID", undefined];
            }
    
            if (typeof amount !== 'number' || amount <= 0) {
                return ["Amount must be a positive number", undefined];
            }
    
            if (typeof currency !== 'string' || currency.length !== 3) {
                return ["Currency must be a 3-letter ISO code (e.g., 'usd')", undefined];
            }
            
            if (typeof stripePaymentIntentId !== 'string') {
                return ["Stripe Payment Intent ID must be a string", undefined];
            }
    
            return [undefined, new CreatePaymentDto(user, order, amount, currency.toLowerCase(), stripePaymentIntentId)];
        }

}

    