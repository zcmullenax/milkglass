import { Injectable } from '@angular/core';
import { productData } from '../data/product-data';

@Injectable()
export class ProductService {
  getProductsData() {
    return productData;
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
}
