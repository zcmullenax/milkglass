import { Flavor } from '../data/flavor-enum';

export interface CartItem {
  productId: number;
  productName: string;
  selectedFlavor?: Flavor;
  selectedSubProductId?: number;
  selectedSubProductName?: string;
  price: number;
  quantity: number;
}
