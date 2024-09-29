import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FinancialProduct {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date;
  date_revision: Date;
}

@Injectable({
  providedIn: 'root',
})
export class FinancialProductsService {
  private apiUrl = 'http://localhost:3002/bp/products';

  constructor(private http: HttpClient) {}

  getProducts(limit: number = 5): Observable<FinancialProduct[]> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<FinancialProduct[]>(this.apiUrl, { params });
  }

  addProduct(product: FinancialProduct): Observable<FinancialProduct> {
    return this.http.post<FinancialProduct>(this.apiUrl, product);
  }
}
