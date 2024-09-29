import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importamos este módulo
import { AddProductComponent } from './add-product.component';
import { FinancialProductsService } from '../financial-products.service'; // Aseguramos que el servicio se importe correctamente

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule, // Importamos HttpClientTestingModule aquí
      ],
      providers: [FinancialProductsService], // Proveemos el servicio aquí
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
    // Llenamos todos los campos
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
    // Dejamos el campo de 'name' vacío
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
    ).toBeTruthy(); // Verifica el error requerido
  });

  it('should calculate revision date one year after the release date', () => {
    // Establecemos una fecha de liberación
    const releaseDate = '2025-01-01';
    component.productForm.controls['date_release'].setValue(releaseDate);

    // Calculamos la fecha de revisión
    const revisionDate = component.calculateRevisionDate(releaseDate);
    expect(revisionDate).toEqual('2026-01-01'); // Verifica que la fecha de revisión sea un año después
  });

  it('should update the date_revision when date_release changes', () => {
    // Establecemos una fecha de liberación
    component.productForm.controls['date_release'].setValue('2025-01-01');

    // Simulamos el cambio de valor en date_release
    fixture.detectChanges();

    // Verificamos que la fecha de revisión se haya actualizado correctamente
    expect(component.productForm.controls['date_revision'].value).toEqual(
      '2026-01-01'
    );
  });
});
