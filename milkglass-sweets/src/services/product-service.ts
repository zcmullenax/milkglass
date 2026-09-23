import { Injectable } from '@angular/core';
import { productData } from '../data/product-data';
import { subProductData } from '../data/sub-product-data';

@Injectable()
export class ProductService {
  getProductsData() {
    return productData;
  }

  getSubProductsData() {
    return subProductData;
  }

  getProductsMini() {
    return Promise.resolve(this.getProductsData().slice(0, 5));
  }

  getProductsSmall() {
    return Promise.resolve(this.getProductsData().slice(0, 10));
  }

  getProducts() {
    return Promise.resolve(this.getProductsData());
  }

  getSubProducts(productId: number) {
    return Promise.resolve(
      this.getSubProductsData().filter((s) => s.parentIds?.includes(productId)),
    );
  }

  getProductsWithSubProducts() {
    const products = this.getProductsData();
    const subProducts = this.getSubProductsData();
    products.forEach((product) => {
      const foundSubs = subProducts.filter((s) => s.parentIds?.includes(product.id ?? 0));
      if (foundSubs.length > 0) {
        product.subProducts = foundSubs;
      }
    });
    return Promise.resolve(products);
  }
}
