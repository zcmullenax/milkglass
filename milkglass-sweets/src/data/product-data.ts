import { Product } from '../models/product';
import { Flavor } from './flavor-enum';
import { InventoryStatus } from './inventory-status-enum';
import { Category } from './product-category-enum';
import { SeasonalName } from './seasonal-enum';
import { Size } from './size-enum';

export const productData: Product[] = [
  {
    id: 1000,
    name: 'Cinnamon Rolls',
    description: "The World's BEST cinnamon roll, according to my husband",
    quantityDescriptor: '1 Dozen Rolls',
    image: 'cinnamon_roll.jpg',
    price: 100,
    category: Category.CinnamonRolls,
    size: Size.Regular,
    seasonalEvents: [],
    flavors: [],
    inventoryStatus: InventoryStatus.OutStock,
    active: false,
  },
  {
    id: 1001,
    name: 'Mini Boo Set',
    description:
      'Mini-sized, Halloween-themed cookies that spell out BOO. The middle O can be replaced with one of several spooky options!',
    quantityDescriptor: 'Qty 1 = (Three 2-inch cookies)',
    image: 'halloween_mini_boo_set.jpg',
    price: 7,
    category: Category.Cookies,
    size: Size.Mini,
    seasonalEvents: [SeasonalName.Halloween, SeasonalName.Fall],
    flavors: [Flavor.VanillaBean, Flavor.Chocolate, Flavor.Funfetti],
    inventoryStatus: InventoryStatus.PreOrder,
    active: true,
  },
  {
    id: 1002,
    name: 'Mini Boo Platter',
    description:
      'An assortment of Mini-sized, Halloween-themed cookies that spell out BOO. The middle O will be of a random spooky design with a guarantee of 5 unique designs per assortment.',
    quantityDescriptor: 'Qty 1 = (Fifteen 2-inch cookies)',
    image: 'halloween_mini_boo_platter.jpg',
    price: 25,
    category: Category.Cookies,
    size: Size.Mini,
    seasonalEvents: [SeasonalName.Halloween, SeasonalName.Fall],
    flavors: [Flavor.VanillaBean, Flavor.Chocolate, Flavor.Funfetti],
    inventoryStatus: InventoryStatus.PreOrder,
    active: true,
  },
  {
    id: 1003,
    name: 'Assorted Dozen Minis',
    description:
      'An assortment of Mini-sized, Halloween-themed cookies. Cookies are random, but guaranteed to contain minimum 5 unique designs',
    quantityDescriptor: 'Qty 1 = (Twelve 2-inch cookies)',
    image: 'halloween_assorted_dozen_minis.jpg',
    price: 20,
    category: Category.Cookies,
    size: Size.Mini,
    seasonalEvents: [SeasonalName.Halloween, SeasonalName.Fall],
    flavors: [Flavor.VanillaBean, Flavor.Chocolate, Flavor.Funfetti],
    inventoryStatus: InventoryStatus.PreOrder,
    active: true,
  },
  {
    id: 1004,
    name: 'Regular Boo Set',
    description:
      'Regular-sized, Halloween-themed cookies that spell out BOO. The middle O can be replaced with one of several spooky options!',
    quantityDescriptor: 'Qty 1 = (Three 3.5-inch cookies)',
    image: 'halloween_regular_boo_set.jpg',
    price: 10,
    category: Category.Cookies,
    size: Size.Mini,
    seasonalEvents: [SeasonalName.Halloween, SeasonalName.Fall],
    flavors: [Flavor.VanillaBean, Flavor.Chocolate, Flavor.Funfetti],
    inventoryStatus: InventoryStatus.PreOrder,
    active: true,
  },
  {
    id: 1005,
    name: 'Random New Thing',
    description:
      'Regular-sized, Halloween-themed cookies that spell out BOO. The middle O can be replaced with one of several spooky options!',
    quantityDescriptor: 'Qty 1 = (Three 3.5-inch cookies)',
    image: 'halloween_regular_boo_set.jpg',
    price: 1000000,
    category: Category.Candy,
    size: Size.Regular,
    seasonalEvents: [SeasonalName.Halloween, SeasonalName.Fall],
    flavors: [Flavor.VanillaBean, Flavor.Chocolate, Flavor.Funfetti],
    inventoryStatus: InventoryStatus.PreOrder,
    active: false,
  },
];
