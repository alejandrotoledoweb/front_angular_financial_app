import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinancialProductsService } from '../financial-products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: FinancialProductsService
  ) {
    this.productForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: [{ value: '', disabled: true }], // Campo de solo lectura
    });
  }

  ngOnInit(): void {
    // Observa los cambios en el campo de 'date_release' y actualiza 'date_revision'
    this.productForm
      .get('date_release')
      ?.valueChanges.subscribe((releaseDate) => {
        const revisionDate = this.calculateRevisionDate(releaseDate);

        if (releaseDate) {
          // Si hay una fecha de liberación, habilita el campo de revisión y actualiza su valor
          this.productForm.get('date_revision')?.enable();
          this.productForm.patchValue({ date_revision: revisionDate });
        } else {
          // Si no hay fecha de liberación, deshabilita el campo de revisión
          this.productForm.get('date_revision')?.disable();
        }
      });
  }
  // Método para calcular la fecha de revisión
  calculateRevisionDate(releaseDate: string): string {
    if (releaseDate) {
      const date = new Date(releaseDate);
      date.setFullYear(date.getFullYear() + 1); // Agrega un año
      return date.toISOString().split('T')[0]; // Retorna en formato YYYY-MM-DD
    }
    return '';
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product = this.productForm.getRawValue();
      this.productService.addProduct(product).subscribe(
        (response) => {
          console.log('Producto agregado con éxito:', response);
        },
        (error) => {
          console.error('Error al agregar el producto:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}
