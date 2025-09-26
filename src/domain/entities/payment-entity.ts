

export class PaymentEntity {

  constructor(
    public readonly id: string,
    public readonly user: string,       // User ID
    public readonly order: string,       // Order ID
    public readonly amount: number,
    public readonly currency: string,
    public readonly stripePaymentIntentId: string,
    public readonly status: string,       // e.g., 'succeeded', 'pending', 'failed'
    public readonly createdAt: Date,
) { }

public static fromObject(object: { [key: string]: any }): PaymentEntity {
    const {
        _id, id,
        user,
        order,
        amount,
        currency,
        stripePaymentIntentId,
        status = 'succeeded', // Default to succeeded as we only save on success
        createdAt,
    } = object;

    if (!_id && !id) {
        throw new Error('Missing ID');
    }

    if (!user) throw new Error('Missing user ID');
    if (!order) throw new Error('Missing order ID');
    if (amount === undefined) throw new Error('Missing amount');
    if (!currency) throw new Error('Missing currency');
    if (!stripePaymentIntentId) throw new Error('Missing Stripe Payment Intent ID');

    return new PaymentEntity(
        _id || id,
        user,
        order,
        amount,
        currency,
        stripePaymentIntentId,
        status,
        createdAt
    );
}
  
  }