// sales-management.component.ts  
import { Component, OnInit } from '@angular/core';  
import { Sale } from '../../model/sale.model';
import { SalesService } from '../../services/sale.service';

@Component({  
  selector: 'app-sales-management',  
  templateUrl: './salesmanagement.component.html',  
  styleUrls: ['./salesmanagement.component.css']  
})  
export class SalesManagementComponent implements OnInit {  
  sales: Sale[] = [];  
  filteredSales: Sale[] = [];  
  searchTerm: string = '';  
  newSale: Sale = new Sale();  

  constructor(private salesService: SalesService) {}  

  ngOnInit(): void {  
    this.salesService.loadSales().subscribe(data => {  
      this.sales = data;  
      this.filteredSales = data; // Initialize filtered sales  
    });  
  }  

  recordSale() {  
    this.newSale.id = this.sales.length + 1; // Simple ID generation  
    this.newSale.totalAmount = this.newSale.quantity * this.newSale.price; // Calculate total amount  
    this.newSale.saleDate = new Date();  

    this.salesService.recordSale(this.newSale);  
    this.updateFilteredSales();  
    this.resetNewSale();  
  }  

  updateSale(saleId: number) {  
    const updatedSale: Partial<Sale> = { quantity: 5, price: 30 }; // Example updates  
    this.salesService.updateSale(saleId, updatedSale);  
    this.updateFilteredSales();  
  }  

  removeSale(saleId: number) {  
    this.salesService.removeSale(saleId);  
    this.updateFilteredSales();  
  }  

  generateSalesReport() {  
    const report = this.salesService.generateSalesReport();  
    console.log('Sales Report:', report);  
    alert(`Total Sales Count: ${report.totalSalesCount}, Total Revenue: ${report.totalRevenue}`);  
  }  

  filterSales() {  
    this.filteredSales = this.salesService.filterSales(this.searchTerm);  
  }  

  private updateFilteredSales() {  
    this.filteredSales = this.salesService.getSales();  
  }  

  private resetNewSale() {  
    this.newSale = new Sale();  
  }  
}