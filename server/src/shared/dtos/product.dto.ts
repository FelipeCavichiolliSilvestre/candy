import { Product } from "@prisma/client";

export class ProductDTO implements Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}
