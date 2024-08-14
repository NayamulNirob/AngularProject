import { Component, OnInit } from '@angular/core';
import { OrderDetails, TimeAction } from '../../../model/sale.model';
import { SaleService } from '../../../services/sale.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-time-action-page',
  templateUrl: './time-action-page.component.html',
  styleUrl: './time-action-page.component.css'
})
export class TimeActionPageComponent implements OnInit{

  order:OrderDetails=new OrderDetails()
  actionList:TimeAction[]=[]
  orderId:any
  constructor(
    private service:SaleService,
    private routeA:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.routeA.params.subscribe(param=> this.orderId = param['id'])
    console.log(this.orderId)
    this.loadOrderbyId(this.orderId)
    this.loadTNAbyOrderId(this.orderId)
    if(typeof document !== "undefined"){
      this.dayDiff('potime', 'tnaTable', 2, 3)
      this.dayDiff('plantime', 'tnaTable', 4, 5)
    }
    
  }

  //time action list
   loadTNAbyOrderId(Id:number){
    this.service.getTimeActionByOrderId(Id).subscribe({
      next: res => {
        this.actionList = res
      },
      error: err => {
        console.log(err);
      }
    })
  }


   //style find by id
   loadOrderbyId(orderId:number){
    this.service.getOrderDetailsById(orderId).subscribe({
      next: res => {
        this.order = res
      },
      error: err => {
        console.log(err);
      }
    })
  }

  // day difference calculation
  dayDiff(tdName:string, myTable:string, scell:number, ecell:number):void {
    if(typeof document !== "undefined"){
    const table = document.getElementById(myTable) as HTMLTableElement;
    var days = 0;

    for (var i = 1; i < table.rows.length; i++) {
        let startDateCell = table.rows[i].cells[scell];
        let endDateCell = table.rows[i].cells[ecell];

        // Check if the cells are defined
        if (startDateCell && endDateCell) {
            const startDate = startDateCell.textContent?.trim() || '';
            const endDate = endDateCell.textContent?.trim() || '';

            if (startDate && endDate) {
                // const mStartDate = new Date(endDate);
                // const mEndDate = new Date(startDate);
                const mStartDate = new Date(startDate);
                const mEndDate = new Date(endDate);

                // Check if the dates are valid
                if (!isNaN(mStartDate.getTime()) && !isNaN(mEndDate.getTime())) {
                    // Calculate the time difference in milliseconds
                    if(mStartDate.getTime() == mEndDate.getTime()){
                        days +=2;

                    }

                    const timeDifference = mEndDate.getTime() - mStartDate.getTime();



                    // Convert the time difference to days
                    days += Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
                }
            }
        }
    }

    document.getElementById(tdName)!.innerHTML = days.toString();
  }
}







}
