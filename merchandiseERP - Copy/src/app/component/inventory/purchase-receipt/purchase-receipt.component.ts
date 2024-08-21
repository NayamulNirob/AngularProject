import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from '../../../services/sale.service';
import { OrderDetails } from '../../../model/sale.model';

@Component({
  selector: 'app-purchase-receipt',
  templateUrl: './purchase-receipt.component.html',
  styleUrl: './purchase-receipt.component.css'
})
export class PurchaseReceiptComponent implements OnInit{

  orderId:any
  order:OrderDetails=new OrderDetails()
  orderAmount:any
  constructor(
    private service: SaleService,
    private routeA: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.routeA.params.subscribe(param => this.orderId = param['id'])
    console.log(this.orderId)
    this.findByOrderDetails(this.orderId);
  }

  //OrderDetails By Id
  private findByOrderDetails(id:number){
    this.service.getOrderDetailsById(id).subscribe({
      next:res=>{
        this.order=res;
        

      },
      error:err=>{
        console.log(err);
      }
    })
  }
  

}
