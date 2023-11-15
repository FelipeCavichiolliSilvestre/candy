import { GetClientCartOutput } from "../carts.interface";
import { ProductDTO } from "../../shared/dtos";

export type GetClientCartOutputItem = GetClientCartOutput[0];
export class GetClientCartResponseDTO implements GetClientCartOutputItem {
  product: ProductDTO;
  quantityOrdered: number;
}
