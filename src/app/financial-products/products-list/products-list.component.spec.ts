import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FinancialProductsService } from '../financial-products.service';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProductsListComponent],
      providers: [FinancialProductsService],
    })
      .overrideComponent(ProductsListComponent, {
        set: {
          template: '<div>Product List Component</div>', // Use inline template for testing
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
