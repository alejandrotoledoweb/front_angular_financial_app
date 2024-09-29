import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FinancialProductsService } from './financial-products.service';

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
});
