// customer.service.ts  
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { tap } from 'rxjs/operators';  
import { Customer } from '../model/sale.model';

@Injectable({  
  providedIn: 'root'  
})  
export class CustomerService { 
  
  private baseUrl = "http://localhost:3000/customer"; 

  private customers: Customer[] = [];  

  constructor(private http: HttpClient) {}  

  loadCustomers(): Observable<Customer[]> {  
    return this.http.get<Customer[]>(this.baseUrl).pipe(  
      tap(data => this.customers = data)  
    );  
  }  

  getCustomers(): Customer[] {  
    return this.customers;  
  }  

  addCustomer(customer: Customer) {  
    this.customers.push(customer);  
  }  

  updateCustomer(customerId: number, updatedCustomer: Partial<Customer>) {  
    const customer = this.customers.find(c => c.id === customerId);  
    if (customer) {  
      Object.assign(customer, updatedCustomer);  
      customer.updatedAt = new Date(); // Update the timestamp  
    }  
  }  

  removeCustomer(customerId: number) {  
    this.customers = this.customers.filter(c => c.id !== customerId);  
  }  

  filterCustomers(searchTerm: string): Customer[] {  
    return this.customers.filter(customer =>  
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||  
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())  
    );  
  }  
}