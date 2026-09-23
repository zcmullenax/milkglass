import { Flavor } from '../data/flavor-enum';
import { InventoryStatus } from '../data/inventory-status-enum';
import { Category } from '../data/product-category-enum';
import { SeasonalName } from '../data/seasonal-enum';
import { Size } from '../data/size-enum';
import { SubProduct } from './sub-product';

export class Product {
  id?: number;
  name?: string;
  description?: string;
  quantityDescriptor?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: InventoryStatus;
  category?: Category;
  size?: Size;
  seasonalEvents?: SeasonalName[];
  flavors?: Flavor[];
  image?: string;
  subProducts?: SubProduct[];
  active?: boolean;
}
