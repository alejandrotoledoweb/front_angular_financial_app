import { Component, OnInit } from '@angular/core';
import {
  FinancialProduct,
  FinancialProductsService,
} from '../financial-products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: FinancialProduct[] = [];
  selectedLimit = 5;

  constructor(private financialProductsService: FinancialProductsService) {}

  ngOnInit(): void {
    this.loadProducts(this.selectedLimit);
  }

  loadProducts(limit: number): void {
    this.financialProductsService.getProducts(limit).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error fetching products', error);
      },
    });
  }

  // Handle limit change
  onLimitChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newLimit = parseInt(selectElement.value, 10);
    this.selectedLimit = newLimit;
    this.loadProducts(this.selectedLimit); // Fetch products with the new limit
  }

  get numberOfResults(): number {
    return this.products.length;
  }
}
