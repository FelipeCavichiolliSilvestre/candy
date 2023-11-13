import { Injectable } from "@nestjs/common";
import { AdjustmentType, Product } from "@prisma/client";

@Injectable()
export abstract class IProductsService {
  abstract register(data: RegisterProductInput): Promise<Product>;
  abstract updateInfo(data: UpdateProductInfoInput): Promise<Product>;
  abstract updateStock(data: UpdateProductStockInput): Promise<Product>;
  abstract updatePrice(data: UpdateProductPriceInput): Promise<Product>;
  abstract list(page?: number): Promise<ListProductsOutput>;
  abstract getOne(productId: number): Promise<Product>;
}

export type RegisterProductInput = {
  name: string;
  description: string;
  price: number;
};

export type UpdateProductInfoInput = {
  productId: number;
  name?: string;
  description?: string;
};

export type UpdateProductStockInput = {
  productId: number;
  value: number;
  type: AdjustmentType;
};

export type UpdateProductPriceInput = {
  productId: number;
  value: number;
};

export type ListProductsOutput = {
  products: Product[];
  hasNextPage: boolean;
};
