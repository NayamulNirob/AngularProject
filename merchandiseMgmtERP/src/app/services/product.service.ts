import { Injectable, NgModule } from '@angular/core';
import { Product } from '../model/sale.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:3000/product";
 

  constructor(private http: HttpClient) {}  

    // Method to get all products  
    getProducts(): Observable<Product[]> {  
      return this.http.get<Product[]>(this.baseUrl+"/");
    }  
 
  createProduct(product: Product): Observable<Product> {  
    return this.http.post<Product>(this.baseUrl+"/save", product);  
  }  

  // Method to edit a product  
  editProduct(productId: number, updatedProduct: Product): Observable<boolean> {  
    return this.http.put<boolean>(`${this.baseUrl}/update/${productId}`, updatedProduct);  
  }  

  // Method to delete a product  
  deleteProduct(productId: number){  
    return this.http.delete(`${this.baseUrl}/delete/${productId}`, { responseType: 'text'});  
  }  



  // Method to get a product by ID  
  getProductById(productId: number): Observable<Product> {  
    return this.http.get<Product>(`${this.baseUrl}/${productId}`); 
  }  
}