

export enum PaymentStatus {
  Pending = 'pending',
  RequiresAction = 'requires_action', // SCA
  Succeeded = 'succeeded',
  Failed = 'failed',
  Canceled = 'canceled'
}

export type Currency = string; // 'usd', 'eur', etc.

export class PaymentEntity {
  

  constructor(
    public id: string,
    public amount: number,
    public currency: Currency,
    public paymentIntentId: string,
    public user: string,
    public status?: PaymentStatus,
    public metadata?: Record<string,string>,
  ) {}


  public static fromObject(object: { [key: string]: any}): PaymentEntity {
    const {id, user, amount, status, paymentIntentId, metadata, currency } = object;

    const paymentEntity = new PaymentEntity (
      id,
      user,
      amount,
      currency,
      status,
      paymentIntentId,
      metadata,

    )

    return paymentEntity;
  }
}
