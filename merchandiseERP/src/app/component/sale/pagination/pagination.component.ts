import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit{
  
  @Input() currentPage:any;
  @Input() itemsPerPage: any;
  @Input() totalItems: any;
  totalPages:number=0;
  pages:number[]=[];


  constructor(){}
  
  ngOnInit(): void {
  if(this.totalItems){
      this.totalPages= Math.ceil(this.totalItems /this.itemsPerPage);
      this.pages=Array.from({length: 3}, ( _ , i) => i+1);
      console.log(" inside if")
    }
    console.log(this.pages)
    console.log(this.totalPages)
    
  }

  
  

}
