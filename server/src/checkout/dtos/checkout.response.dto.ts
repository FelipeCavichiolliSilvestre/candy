import { CheckoutOutput } from "../checkout.interface";

export class CheckoutResponseDTO implements CheckoutOutput {
  orderId: string;
  checkoutLink: string;
}
