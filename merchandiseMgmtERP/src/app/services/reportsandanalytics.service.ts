import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { tap } from 'rxjs/operators';  
import { InventoryItem, Sale, Supplier } from '../model/sale.model';


@Injectable({  
  providedIn: 'root',  
})  
export class ReportsService {  

  private baseUrl="http://localhost:3000/"

  private inventory: InventoryItem[] = [];  
  private sales: Sale[] = [];  
  private suppliers: Supplier[] = [];  

  constructor(private http: HttpClient) {}  

  loadInventory(): Observable<InventoryItem[]> {  
    return this.http.get<InventoryItem[]>(this.baseUrl+"inventory").pipe(  
      tap(data => this.inventory = data)  
    );  
  }  

  loadSales(): Observable<Sale[]> {  
    return this.http.get<Sale[]>(this.baseUrl+"sales").pipe(  
      tap(data => this.sales = data)  
    );  
  }  

  loadSuppliers(): Observable<Supplier[]> {  
    return this.http.get<Supplier[]>(this.baseUrl+"Supplier").pipe(  
      tap(data => this.suppliers = data)  
    );  
  }  

  getInventory(): InventoryItem[] {  
    return this.inventory;  
  }  

  getSales(): Sale[] {  
    return this.sales;  
  }  

  getSuppliers(): Supplier[] {  
    return this.suppliers;  
  }  

  getSalesRevenueChartData(): { labels: string[], data: number[] } {  
    const labels = this.sales.map(sale => sale.productName);  
    const data = this.sales.map(sale => sale.totalAmount);  
    return { labels, data };  
  }  
}