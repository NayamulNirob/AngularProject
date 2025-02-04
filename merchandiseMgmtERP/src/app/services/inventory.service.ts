// inventory.service.ts  
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { tap } from 'rxjs/operators';  
import { InventoryItem } from '../model/sale.model';

@Injectable({  
  providedIn: 'root'  
})  
export class InventoryService {  

  private baseUrl = "http://localhost:3000/inventory"; // Adjust this URL to match your backend  
  private inventory: InventoryItem[] = [];  

  constructor(private http: HttpClient) {}  

  loadInventory(): Observable<InventoryItem[]> {  
    return this.http.get<InventoryItem[]>(this.baseUrl).pipe(  
      tap(data => this.inventory = data)  
    );  
  }  

  // getAllInventories():Observable<any>{
  //   return this.http.get(this.baseUrl);
  // }



  getInventory(): InventoryItem[] {  
    return this.inventory;  
  }  

  addInventoryItem(item: InventoryItem) {  
    this.inventory.push(item);  
  }  

  updateStock(productId: number, quantity: number) {  
    const product = this.inventory.find(p => p.id === productId);  
    if (product) product.stock += quantity;  
  }  

  manageLocation(productId: number, location: string) {  
    const product = this.inventory.find(p => p.id === productId);  
    if (product) product.location = location;  
  }  

  filterInventory(searchTerm: string): InventoryItem[] {  
    return this.inventory.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));  
  }  

  sortInventory(by: 'name' | 'stock' | 'price'): InventoryItem[] {  
    return this.inventory.sort((a, b) => {  
      if (a[by] < b[by]) return -1;  
      if (a[by] > b[by]) return 1;  
      return 0;  
    });  
  }  
}
