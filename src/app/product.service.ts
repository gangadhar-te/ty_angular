import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product } from './productInter.component';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  getAllProducts() {
    return this.http.get<{ error: boolean, message: string, products: Product[]}>(`${environment.baseUrl}/api/products`)
  }

  postProducts(form) {
    return this.http.post<{ error: boolean, message: string, products: Product}>
    ('https://ty-shop.herokuapp.com/api/products',form) 
  }

  deleteProduct(id) {
    return this.http.delete<{ error: boolean, message: string, products: Product}>
    (`${environment.baseUrl}/api/products/${id}`)
  }

  updateProduct(product) {
    return this.http.put<{ error: boolean, message: string, response: Product}>(
      `${environment.baseUrl}/api/products/${product._id}`,product)
  }
}
