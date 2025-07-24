

export class PaymentEntity {

    constructor(
        public userId: string,
        public amount : number,
        public currency: string,
        public paymentDate: Date,
        public status: 'pending' | 'paid' | 'failed' = 'pending',
        public stripeSessionId: string,
    ) { }
  
    public static fromObject( object: { [ key: string ]: any; } ): PaymentEntity {
      const { userId, amount, currency, paymentDate, stripeSessionId, status } = object;
  
      const paymentEntity = new PaymentEntity(
        userId,
        amount,
        currency,
        paymentDate,
        status,
        stripeSessionId
      );
      
      return paymentEntity;
  
    }
  
  }