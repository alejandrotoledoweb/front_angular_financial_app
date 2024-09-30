import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddProductComponent } from './add-product.component';
import { FinancialProductsService } from '../financial-products.service';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [FinancialProductsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled correctly', () => {
    component.productForm.controls['id'].setValue('123');
    component.productForm.controls['name'].setValue('Producto Test');
    component.productForm.controls['description'].setValue(
      'Descripción del producto test'
    );
    component.productForm.controls['date_release'].setValue('2025-01-01');
    component.productForm.controls['logo'].setValue('assets/logo.png');

    expect(component.productForm.valid).toBeTruthy();
  });

  it('should invalidate the form if required fields are missing', () => {
    component.productForm.controls['id'].setValue('123');
    component.productForm.controls['name'].setValue('');
    component.productForm.controls['description'].setValue(
      'Descripción del producto test'
    );
    component.productForm.controls['date_release'].setValue('2025-01-01');
    component.productForm.controls['logo'].setValue('assets/logo.png');

    expect(component.productForm.invalid).toBeTruthy();
    expect(
      component.productForm.controls['name'].errors?.['required']
    ).toBeTruthy();
  });

  it('should calculate revision date one year after the release date', () => {
    const releaseDate = '2025-01-01';
    component.productForm.controls['date_release'].setValue(releaseDate);

    const revisionDate = component.calculateRevisionDate(releaseDate);
    expect(revisionDate).toEqual('2026-01-01');
  });

  it('should update the date_revision when date_release changes', () => {
    component.productForm.controls['date_release'].setValue('2025-01-01');
    fixture.detectChanges();
    expect(component.productForm.controls['date_revision'].value).toEqual(
      '2026-01-01'
    );
  });
});
