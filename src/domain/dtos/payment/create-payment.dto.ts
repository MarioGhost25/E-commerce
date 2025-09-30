
import { Types } from 'mongoose';

export class CreatePaymentDto {

    private constructor(
            public readonly user: string,
            
            public readonly amount: number,
            public readonly currency: string,
           
        ) {}
    
        public static createPayment(object: { [key: string]: any }): [string?, CreatePaymentDto?] {
            const { user, amount, currency } = object;

            let amountNumber = typeof amount === 'string' ? parseFloat(amount) : amount;
    
            // 1. Required Fields Validation
            if (!user) return ["Missing user ID", undefined];
            
            if (amount === undefined) return ["Missing amount", undefined];
            if (!currency) return ["Missing currency", undefined];
            // 2. Type and Value Validation
            if (!Types.ObjectId.isValid(user)) {
                return ["Invalid user ID", undefined];
            }
    
            // if (!Types.ObjectId.isValid(order)) {
            //     return ["Invalid order ID", undefined];
            // }
    
            if (typeof amountNumber !== 'number' || amountNumber <= 0) {
                return ["Amount must be a positive number", undefined];
            }
    
            if (typeof currency !== 'string' || currency.length !== 3) {
                return ["Currency must be a 3-letter ISO code (e.g., 'usd')", undefined];
            }
            
    
            return [undefined, new CreatePaymentDto(user, amount, currency.toLowerCase())];
        }

}

    