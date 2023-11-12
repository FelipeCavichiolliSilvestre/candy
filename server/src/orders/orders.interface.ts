export abstract class IOrdersService {
  abstract confirmPayment(orderId: string): Promise<void>;
}
