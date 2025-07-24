


export class CreatePaymentDto {

    constructor(
        public userId: string,
        public amount : number,
        public currency: string,
        public paymentDate: Date,
        public status: 'pending' | 'paid' | 'failed' = 'pending',
        public stripeSessionId: string,
    ){}

    public static createPayment (object1: {[key: string]: any}): [string?, CreatePaymentDto?] {
        const { userId, amount, currency, paymentDate, status, stripeSessionId } = object1;

        if(!userId) return ["Missing User Id", undefined];
        if(!amount) return ["Missing Amount", undefined];
        if(!currency) return ["Missing Currency", undefined];
        if(!paymentDate) return ["Missing Payment Date", undefined];
        if(!status) return ["Missing Status", undefined];
        if(!stripeSessionId) return ["Missing Stripe Session Id", undefined];

        return [undefined, new CreatePaymentDto(userId, amount, currency, paymentDate, status, stripeSessionId)];
    }

}

    