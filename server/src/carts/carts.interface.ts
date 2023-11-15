import { Product } from "@prisma/client";

export abstract class ICartsService {
  abstract getClientCart(clientId: string): Promise<GetClientCartOutput>;
  abstract updateCartItem(data: UpdateCartItemInput): Promise<void>;
}

export type GetClientCartOutput = {
  product: Product;
  quantityOrdered: number;
}[];

export type UpdateCartItemInput = {
  clientId: string;
  productId: number;
  quantity: number;
};
