import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { FinancialProductsService } from '../financial-products.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ProductsListComponent with search', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productService: FinancialProductsService;

  const mockProducts = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'logo1.png',
      date_release: new Date('2022-01-01'),
      date_revision: new Date('2023-01-01'),
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      logo: 'logo2.png',
      date_release: new Date('2022-06-01'),
      date_revision: new Date('2023-06-01'),
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProductsListComponent],
      providers: [FinancialProductsService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(FinancialProductsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display the list of products', () => {
    jest.spyOn(productService, 'getProducts').mockReturnValue(of(mockProducts));

    component.ngOnInit(); // Manually call ngOnInit to trigger data fetching
    fixture.detectChanges();

    expect(component.products.length).toBe(2);
    expect(component.filteredProducts.length).toBe(2);
  });

  it('should filter products by search term', () => {
    jest.spyOn(productService, 'getProducts').mockReturnValue(of(mockProducts));

    component.ngOnInit();
    fixture.detectChanges();

    // Set the search term
    component.searchTerm = 'Product 1';
    component.filterProducts();
    fixture.detectChanges();

    // Expect the filtered products list to contain only 'Product 1'
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toBe('Product 1');
  });

  it('should filter products case-insensitively', () => {
    jest.spyOn(productService, 'getProducts').mockReturnValue(of(mockProducts));

    component.ngOnInit();
    fixture.detectChanges();

    // Set the search term with different casing
    component.searchTerm = 'product 2';
    component.filterProducts();
    fixture.detectChanges();

    // Expect the filtered products list to contain 'Product 2'
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toBe('Product 2');
  });

  it('should show all products when search term is empty', () => {
    jest.spyOn(productService, 'getProducts').mockReturnValue(of(mockProducts));

    component.ngOnInit();
    fixture.detectChanges();

    // Set the search term to an empty string
    component.searchTerm = '';
    component.filterProducts();
    fixture.detectChanges();

    // Expect all products to be shown
    expect(component.filteredProducts.length).toBe(2);
  });

  it('should show no products if search term does not match', () => {
    jest.spyOn(productService, 'getProducts').mockReturnValue(of(mockProducts));

    component.ngOnInit();
    fixture.detectChanges();

    // Set the search term to a non-matching value
    component.searchTerm = 'Non-existing product';
    component.filterProducts();
    fixture.detectChanges();

    // Expect no products to be shown
    expect(component.filteredProducts.length).toBe(0);
  });
});
