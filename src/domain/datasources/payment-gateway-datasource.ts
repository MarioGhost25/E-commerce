export abstract class PaymentGatewayDatasource {
  abstract createCheckoutSession(amount: number, currency: string): Promise<string>;
}