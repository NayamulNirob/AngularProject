
 

// sales.service.ts  
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { tap } from 'rxjs/operators';  
import { Sale } from '../model/sale.model';

@Injectable({  
  providedIn: 'root'  
})  
export class SalesService {  
  
  baseUrl = "http://localhost:3000/sales"
  
  private sales: Sale[] = [];  

  constructor(private http: HttpClient) {}  

  loadSales(): Observable<Sale[]> {  
    return this.http.get<Sale[]>(this.baseUrl).pipe(  
      tap(data => this.sales = data)  
    );  
  }  

  getSales(): Sale[] {  
    return this.sales;  
  }  

  recordSale(sale: Sale) {  
    this.sales.push(sale);  
  }  

  updateSale(saleId: number, updatedSale: Partial<Sale>) {  
    const sale = this.sales.find(s => s.id === saleId);  
    if (sale) {  
      Object.assign(sale, updatedSale);  
    }  
  }  

  removeSale(saleId: number) {  
    this.sales = this.sales.filter(s => s.id !== saleId);  
  }  

  generateSalesReport() {  
    const totalSales = this.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);  
    const report = {  
      totalSalesCount: this.sales.length,  
      totalRevenue: totalSales  
    };  
    return report;  
  }  

  filterSales(searchTerm: string): Sale[] {  
    return this.sales.filter(sale =>  
      sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||  
      sale.customerName.toLowerCase().includes(searchTerm.toLowerCase())  
    );  
  }  
}