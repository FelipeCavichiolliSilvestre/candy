import { Product } from "@prisma/client";

export abstract class ICartsService {
  abstract getClientCart(data: GetUserCartInput): Promise<GetUserCartOutput>;
  abstract updateCartItem(data: UpdateCartItemInput): Promise<void>;

  abstract checkoutCart(data: CheckoutCartInput): Promise<CheckoutOutput>;
  abstract checkoutOrder(data: CheckoutOrderInput): Promise<CheckoutOutput>;
}

export type GetUserCartInput = {
  clientId: string;
};

export type GetUserCartOutput = {
  product: Product;
  quantityOrdered: number;
}[];

export type UpdateCartItemInput = {
  clientId: string;
  productId: number;
  quantity: number;
};

export type CheckoutCartInput = {
  clientId: string;
  address: string;
};

export type CheckoutOrderInput = {
  orderId: string;
};

export type CheckoutOutput = {
  orderId: string;
  checkoutLink: string;
};
