import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  FinancialProduct,
  FinancialProductsService,
} from './financial-products.service';

describe('FinancialProductsService', () => {
  let service: FinancialProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FinancialProductsService], // Ensure the service is injected
    });

    service = TestBed.inject(FinancialProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure there are no outstanding requests after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products with a limit', () => {
    const mockProducts = [
      {
        id: 'one',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'logo1.png',
        date_release: new Date(),
        date_revision: new Date(),
      },
      {
        id: 'two',
        name: 'Product 2',
        description: 'Description 2',
        logo: 'logo2.png',
        date_release: new Date(),
        date_revision: new Date(),
      },
    ];

    service.getProducts(2).subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('http://localhost:3002/bp/products?limit=2');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts); // Mock the HTTP response
  });

  it('should send a POST request to add a product', () => {
    const newProduct: FinancialProduct = {
      id: 'prod123',
      name: 'Producto Nuevo',
      description: 'Descripción del nuevo producto',
      logo: 'assets/logo.png',
      date_release: new Date('2025-01-01'),
      date_revision: new Date('2026-01-01'),
    };

    service.addProduct(newProduct).subscribe((response) => {
      expect(response).toEqual(newProduct);
    });

    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);

    req.flush(newProduct); // Simula la respuesta del servidor
  });

  it('should handle an error when adding a product fails', () => {
    const newProduct: FinancialProduct = {
      id: 'prod123',
      name: 'Producto Erroneo',
      description: 'Descripción del producto',
      logo: 'assets/logo.png',
      date_release: new Date('2025-01-01'),
      date_revision: new Date('2026-01-01'),
    };

    service.addProduct(newProduct).subscribe(
      () => fail('Debería fallar'),
      (error) => {
        expect(error.status).toBe(400);
        expect(error.error.message).toBe(
          "Invalid body, check 'errors' property for more info."
        );
      }
    );

    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toBe('POST');

    // Simula una respuesta de error del servidor
    req.flush(
      { message: "Invalid body, check 'errors' property for more info." },
      { status: 400, statusText: 'Bad Request' }
    );
  });
});
