import { Component, OnInit } from '@angular/core';
import { OrderDetails, Purchase, Stock } from '../model/sale.model';
import { SaleService } from '../services/sale.service';

@Component({
  selector: 'app-control-wrapper',
  templateUrl: './control-wrapper.component.html',
  styleUrl: './control-wrapper.component.css'
})
export class ControlWrapperComponent implements OnInit {

  orderCount: any
  orderTotal: any
  purchaseTotal: any
  revenue: any
  //table
  order: OrderDetails[] = []
  purchase: Purchase[] = []
  stock: Stock [] = []

  constructor(
    private service: SaleService
  ) { }
  ngOnInit(): void {
    this.loadOrder()
    this.loadPurchase()
    this.loadStock()
    this.findOrderCount()
    this.findOrderTotal()
    this.findPurchaseTotal()
    this.findRevenue()

  }

  //all Revenue
  private findRevenue() {
    this.service.getRevenue().subscribe({
      next: res => {
        this.revenue = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  //all purchase total
  private findPurchaseTotal() {
    this.service.getPurchaseTotal().subscribe({
      next: res => {
        this.purchaseTotal = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  //all Order total
  private findOrderTotal() {
    this.service.getOrderTotal().subscribe({
      next: res => {
        this.orderTotal = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  //all Order cout
  private findOrderCount() {
    this.service.getOrdercount().subscribe({
      next: res => {
        this.orderCount = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  //all orders list
  private loadOrder() {
    this.service.getAllOrdersDetails().subscribe({
      next: res => {
        this.order = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  //all Purchase list
  private loadPurchase() {
    this.service.getAllPurchase().subscribe({
      next: res => {
        this.purchase = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  //all Stock  list
  private loadStock() {
    this.service.getAllStock().subscribe({
      next: res => {
        this.stock = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }



}
