// order.service.ts  
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { tap } from 'rxjs/operators';  
import { OrderItem } from '../model/sale.model';

@Injectable({  
  providedIn: 'root'  
})  
export class OrderService {  
  private baseUrl = "http://localhost:3000/orders"; 
  private orders: OrderItem[] = [];  

  constructor(private http: HttpClient) {}  

  loadOrders(): Observable<OrderItem[]> {  
    return this.http.get<OrderItem[]>(this.baseUrl).pipe(  
      tap(data => this.orders = data)  
    );  
  }  

  getOrders(): OrderItem[] {  
    return this.orders;  
  }  

  createOrder(order: OrderItem):Observable<OrderItem> {  
    return this.http.post<OrderItem>(this.baseUrl,order).pipe(
      tap(newOrder=>this.orders.push(newOrder))
    )  
  }  

  updateOrder(orderId: string, updatedOrder: Partial<OrderItem>) {  
    const order = this.orders.find(o => o.id === orderId);  
    if (order) {  
      Object.assign(order, updatedOrder);  
    }  
  }  


  deleteOrder(orderId: string): Observable<OrderItem> {  
    return this.http.delete<OrderItem>(`${this.baseUrl}/${orderId}`).pipe(  
      tap(() => {  
        // Remove the deleted order from local orders  
        this.orders = this.orders.filter(o => o.id !== orderId);  
      })  
    );  
}


  filterOrders(searchTerm: string): OrderItem[] {  
    return this.orders.filter(order => order.customerName.toLowerCase().includes(searchTerm.toLowerCase()));  
  }  

  sortOrders(by: 'customerName' | 'orderDate' | 'totalPrice'): OrderItem[] {  
    return this.orders.sort((a, b) => {  
      if (a[by] < b[by]) return -1;  
      if (a[by] > b[by]) return 1;  
      return 0;  
    });  
  }  
}