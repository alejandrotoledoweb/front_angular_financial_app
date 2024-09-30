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
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    this.productForm
      .get('date_release')
      ?.valueChanges.subscribe((releaseDate) => {
        const revisionDate = this.calculateRevisionDate(releaseDate);

        this.productForm.get('date_revision')?.disable();
        if (releaseDate) {
          this.productForm.patchValue({ date_revision: revisionDate });
        }
      });
  }
  calculateRevisionDate(releaseDate: string): string {
    if (releaseDate) {
      const date = new Date(releaseDate);
      date.setFullYear(date.getFullYear() + 1);
      return date.toISOString().split('T')[0];
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

  resetForm(): void {
    this.productForm.reset({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    });
  }
}
