import { Component, OnInit } from '@angular/core';  
import { InventoryItem, Sale, Supplier } from '../../model/sale.model';
import { ReportsService } from '../../services/reportsandanalytics.service';

@Component({  
  selector: 'app-reports-analytics',  
  templateUrl: './reports-and-analytics.component.html',  
  styleUrls: ['./reports-and-analytics.component.css']  
})  
export class ReportsAnalyticsComponent implements OnInit { 

  inventoryItems: InventoryItem[] = [];  
  sales: Sale[] = [];  
  suppliers: Supplier[] = [];  
  salesRevenueChartData: { labels: string[], data: number[] } = { labels: [], data: [] };  

  constructor(private reportsService: ReportsService,
    
  ) {}  

  ngOnInit(): void {  
    this.reportsService.loadInventory().subscribe(inventoryData => {  
      this.inventoryItems = inventoryData;  
    });  
    this.reportsService.loadSales().subscribe(salesData => {  
      this.sales = salesData;  
      this.salesRevenueChartData = this.reportsService.getSalesRevenueChartData();  
    });  
    this.reportsService.loadSuppliers().subscribe(suppliersData => {  
      this.suppliers = suppliersData;  
    });  
  }

  // other-data
  private loadSales(): void {  
    this.reportsService.loadSales().subscribe(data => {  
      this.sales = data;  
      this.prepareChartData();  
    });  
  }  

  private prepareChartData(): void {  
    // Assuming this.sales has already loaded  
    this.salesRevenueChartData.labels = this.sales.map(sale => sale.productName);  
    this.salesRevenueChartData.data = this.sales.map(sale => sale.totalAmount);  
  }  

  get maxRevenue(): number {  
    return Math.max(...this.salesRevenueChartData.data);  
  }  
  //other-data-end
}
