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
    // this.isLoading = true;
    // this.productService.getProducts().subscribe(
    //   (products) => {
    //     this.products = products;
    //     this.isLoading = false;
    //   },
    //   (error) => {
    //     this.errorMessage = 'Error occurred while fetching products';
    //     this.isLoading = false;
    //   }
    // );
    this.fetchProducts(this.selectedLimit);
  }

  // Método para obtener los productos con límite
  fetchProducts(limit: number): void {
    this.isLoading = true; // Mostrar indicador de carga
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
    // Filtra los productos basados en el término de búsqueda
    this.filteredProducts = this.products.filter((product) => {
      const search = this.searchTerm.toLowerCase();
      return product.name.toLowerCase().includes(search);
      // ||
      // product.description.toLowerCase().includes(search)
    });
  }

  // Método para contar el total de productos
  getTotalProducts(): number {
    return this.products.length;
  }

  // Cambiar el límite de productos a mostrar
  onLimitChange(event: Event): void {
    const limit = (event.target as HTMLSelectElement).value;
    this.selectedLimit = +limit;
    this.fetchProducts(this.selectedLimit); // Vuelve a hacer la solicitud con el nuevo límite
  }
}
