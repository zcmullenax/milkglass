import { Component, Inject, OnInit, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ProductService } from '../../../services/product-service';
import { Product } from '../../../models/product';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InventoryStatus } from '../../../data/inventory-status-enum';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-current-pre-order-component',
  imports: [CarouselModule, ButtonModule, TagModule, CommonModule, NgOptimizedImage],
  providers: [ProductService],
  templateUrl: './current-pre-order-component.html',
  styleUrl: './current-pre-order-component.scss',
})
export class CurrentPreOrderComponent implements OnInit {

  constructor( private _productService : ProductService) {}
  products = signal<Product[]>([]);
  responsiveOptions: any[] | undefined;

  ngOnInit(): void {
    this._productService.getProductsSmall().then((products) => {
      this.products.set(products);
    });
    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '1199px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '575px',
          numVisible: 1,
          numScroll: 1
      }
    ];    
  }

  getSeverity(status: InventoryStatus) {
    switch (status) {
        case InventoryStatus.PreOrder || InventoryStatus.InStock:
            return 'success';
        case InventoryStatus.Backorder:
            return 'warn';
        case InventoryStatus.OutStock:
            return 'danger';
        default:
          return 'secondary'
    }
  }


}
