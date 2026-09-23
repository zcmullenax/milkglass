import { Flavor } from '../data/flavor-enum';
import { Product } from './product';
import { SubProduct } from './sub-product';

export class CartItem {
  product?: Product;
  selectedFlavor?: Flavor;
  selectedSubProduct?: SubProduct;
  qty?: number;
}
