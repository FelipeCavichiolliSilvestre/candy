import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import {
  IProductsService,
  ListProductsOutput,
  RegisterProductInput,
  UpdateProductInfoInput,
  UpdateProductPriceInput,
  UpdateProductStockInput,
} from "./products.interface";
import { AdjustmentType, Product } from "@prisma/client";

@Injectable()
export class ProductsService implements IProductsService {
  constructor(private prisma: PrismaService) {}

  async register(data: RegisterProductInput): Promise<Product> {
    const { name, price, description } = data;

    const result = await this.prisma.productPriceHistory.create({
      data: {
        price,
        product: { create: { name, description, price: 0, quantity: 0 } },
      },
      include: { product: { select: { id: true, quantity: true } } },
    });

    return {
      id: result.product.id,
      name,
      description,
      quantity: result.product.quantity,
      price,
    };
  }

  async updateInfo(data: UpdateProductInfoInput): Promise<Product> {
    const { productId, name, description } = data;

    const product = await this.prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        quantity: true,
      },
    });

    return product;
  }

  async updateStock(data: UpdateProductStockInput): Promise<Product> {
    const { productId, type, value } = data;

    if (type === AdjustmentType.EXPIRED && value >= 0)
      throw new Error("Invalid input error");
    if (type === AdjustmentType.COOKED && value <= 0)
      throw new Error("Invalid input error");

    const { product } = await this.prisma.productInventoryAdjustment.create({
      data: {
        productId,
        quantity: value,
        type,
      },
      select: {
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            quantity: true,
          },
        },
      },
    });

    return product;
  }

  async updatePrice(data: UpdateProductPriceInput): Promise<Product> {
    const { productId, value } = data;

    const { product } = await this.prisma.productPriceHistory.create({
      data: {
        productId,
        price: value,
      },
      select: {
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            quantity: true,
          },
        },
      },
    });

    return product;
  }

  async list(page?: number | undefined): Promise<ListProductsOutput> {
    const products = await this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        quantity: true,
      },
      skip: (page ?? 0) * 10,
      take: 11,
    });

    return {
      products: products.slice(0, 10),
      hasNextPage: products.length === 11,
    };
  }
}
