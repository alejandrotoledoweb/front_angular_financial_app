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
  filteredProducts: FinancialProduct[] = [];
  isLoading = false;
  errorMessage = '';
  selectedLimit = 5;
  searchTerm = '';

  constructor(private productService: FinancialProductsService) {}

  ngOnInit(): void {
    this.fetchProducts(this.selectedLimit);
  }

  fetchProducts(limit: number): void {
    this.isLoading = true;
    this.productService.getProducts(limit).subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error occurred while fetching products';
        this.isLoading = false;
      }
    );
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter((product) => {
      const search = this.searchTerm.toLowerCase();
      return product.name.toLowerCase().includes(search);
    });
  }

  getTotalProducts(): number {
    return this.products.length;
  }

  onLimitChange(event: Event): void {
    const limit = (event.target as HTMLSelectElement).value;
    this.selectedLimit = +limit;
    this.fetchProducts(this.selectedLimit);
  }
}
