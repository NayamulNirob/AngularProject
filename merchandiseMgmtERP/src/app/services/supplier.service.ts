// supplier.service.ts  
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable, throwError } from 'rxjs';  
import { catchError, tap } from 'rxjs/operators';  
import { Supplier } from '../model/sale.model';

@Injectable({  
  providedIn: 'root'  
})  
export class SupplierService {  

  private baseUrl = "http://localhost:3000/Supplier";

  private suppliers: Supplier[] = [];  

  constructor(private http: HttpClient) {}  

  loadSuppliers(): Observable<Supplier[]> {  
    return this.http.get<Supplier[]>(this.baseUrl).pipe(  
      tap(data => this.suppliers = data)  
    );  
  }  

  getSuppliers(): Supplier[] {  
    return this.suppliers;  
  }  

  // addSupplier(supplier: Supplier) {  
  //   this.suppliers.push(supplier);  
  // }  

  addSupplier(supplier: Supplier): Observable<Supplier> {  
    return this.http.post<Supplier>(this.baseUrl, supplier).pipe(  
      tap(newSupplier => this.suppliers.push(newSupplier))  
    );  
  } 

  // updateSupplier(supplierId: number, updatedSupplier: Partial<Supplier>) {  
  //   const supplier = this.suppliers.find(s => s.id === supplierId);  
  //   if (supplier) {  
  //     Object.assign(supplier, updatedSupplier);  
  //     supplier.updatedAt = new Date(); // Update timestamp  
  //   }  
  // }  

  // updateSupplier(supplierId: number, updatedSupplier: Partial<Supplier>): Observable<Supplier> {  
  //   return this.http.put<Supplier>(`${this.baseUrl}/${supplierId}`, updatedSupplier).pipe(  
  //     tap(updated => {  
  //       const index = this.suppliers.findIndex(s => s.id === supplierId);  
  //       if (index !== -1) {  
  //         this.suppliers[index] = { ...this.suppliers[index], ...updated };  
  //       }  
  //     })  
  //   );  
  // }


  updateSupplier(supplierId: number, updatedSupplier: Partial<Supplier>): Observable<Supplier> {  
    return this.http.put<Supplier>(`${this.baseUrl}/${supplierId}`, updatedSupplier).pipe(  
      tap(updated => {  
        const index = this.suppliers.findIndex(s => s.id === supplierId);  
        if (index !== -1) {  
          this.suppliers[index] = { ...this.suppliers[index], ...updated };  
        }  
      }),  
      catchError(this.handleError)  
    );  
  }

  // removeSupplier(supplierId: number) {  
  //   this.suppliers = this.suppliers.filter(s => s.id !== supplierId);  
  // }  

  // removeSupplier(supplierId: number): Observable<void> {  
  //   return this.http.delete<void>(`${this.baseUrl}/${supplierId}`).pipe(  
  //     tap(() => {  
  //       this.suppliers = this.suppliers.filter(s => s.id !== supplierId);  
  //     })  
  //   );  
  // }

  removeSupplier(supplierId: number): Observable<void> {  
    return this.http.delete<void>(`${this.baseUrl}/${supplierId}`).pipe(  
      tap(() => {  
        this.suppliers = this.suppliers.filter(s => s.id !== supplierId);  
      }),  
      catchError(this.handleError)  
    );  
  } 

  filterSuppliers(searchTerm: string): Supplier[] {  
    return this.suppliers.filter(supplier =>  
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||  
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())  
    );  
  }  

  sortSuppliers(by: 'name' | 'contactPerson' | 'email'): Supplier[] {  
    return this.suppliers.sort((a, b) => {  
      if (a[by] < b[by]) return -1;  
      if (a[by] > b[by]) return 1;  
      return 0;  
    });  
  }  



  private handleError(error: any) {  
    console.error('An error occurred', error); // Log the error to the console  
    return throwError(() => new Error('Something went wrong; please try again later.'));  
  }  
}

