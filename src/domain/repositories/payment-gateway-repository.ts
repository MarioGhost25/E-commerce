export abstract class PaymentGatewayRepository {
  abstract createCheckoutSession(amount: number, currency: string): Promise<string>;
}