import { Injectable, signal, computed } from '@angular/core';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { Flavor } from '../data/flavor-enum';
import { SubProduct } from '../models/sub-product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly storageKey = 'cart';

  private readonly _cart = signal<Cart>(this.loadCart());

  readonly cart = this._cart.asReadonly();

  readonly itemCount = computed(() =>
    this._cart().items.reduce((total, item) => total + item.quantity, 0),
  );

  readonly total = computed(() =>
    this._cart().items.reduce((total, item) => total + item.price * item.quantity, 0),
  );

  addItem(product: Product, flavor?: Flavor, subProduct?: SubProduct, quantity = 1): void {
    const item = this.convertProduct(product, quantity, flavor, subProduct);
    this._cart.update((cart) => {
      const existing = cart.items.find(
        (x) =>
          x.productId === item.productId &&
          x.selectedFlavor === item.selectedFlavor &&
          x.selectedSubProductId === item.selectedSubProductId,
      );

      if (existing) {
        return {
          ...cart,
          items: cart.items.map((x) =>
            x.productId === item.productId ? { ...x, quantity: x.quantity + item.quantity } : x,
          ),
        };
      }

      return {
        ...cart,
        items: [...cart.items, item],
      };
    });

    this.saveCart();
  }

  removeItem(productId: number, flavor?: Flavor, subProductId?: number): void {
    this._cart.update((cart) => ({
      ...cart,
      items: cart.items.filter(
        (x) =>
          x.productId !== productId &&
          x.selectedFlavor !== flavor &&
          x.selectedSubProductId !== subProductId,
      ),
    }));

    this.saveCart();
  }

  clearCart(): void {
    this._cart.set({ items: [] });
    this.saveCart();
  }

  private loadCart(): Cart {
    const stored = localStorage.getItem(this.storageKey);

    if (!stored) {
      return { items: [] };
    }

    try {
      return JSON.parse(stored);
    } catch {
      return { items: [] };
    }
  }

  private saveCart(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this._cart()));
  }

  private convertProduct(
    product: Product,
    quantity: number,
    flavor?: Flavor,
    subProduct?: SubProduct,
  ): CartItem {
    return {
      productId: product.id!,
      productName: product.name!,
      selectedFlavor: flavor,
      selectedSubProductId: subProduct?.id,
      selectedSubProductName: subProduct?.name,
      price: product.price!,
      quantity: quantity,
    };
  }
}
