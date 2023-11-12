import { Product } from "@prisma/client";

export abstract class ICartsService {
  abstract getClientCart(data: GetUserCartInput): Promise<GetUserCartOutput>;
  abstract updateCartItem(data: UpdateCartItemInput): Promise<void>;
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
