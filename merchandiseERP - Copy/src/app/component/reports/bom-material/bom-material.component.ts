import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { LaborCost, Style, StyleAttachment, StyleMaterialQty } from '../../../model/sale.model';
import { SaleService } from '../../../services/sale.service';
import { ActivatedRoute } from '@angular/router';
import { Console } from 'console';

@Component({
  selector: 'app-bom-material',
  templateUrl: './bom-material.component.html',
  styleUrl: './bom-material.component.css'
})
export class BomMaterialComponent implements OnInit,AfterViewInit{

  imageList: StyleAttachment[] = []
  cost: LaborCost[] = []
  smallQty: StyleMaterialQty[] = []
  midQty: StyleMaterialQty[] = []
  largeQty: StyleMaterialQty[] = []
  //style variable for single object
  styleData: Style = new Style();
  styleId:any
  title: string = "Style BOM list";
  constructor(
    private service: SaleService,
    private routeA:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.routeA.params.subscribe(param=> this.styleId = param['id'])
    console.log(this.styleId)
    this.loadLaborCost(this.styleId)
        this.loadAttachment(this.styleId)
        this.loadsmallMaterialQty(this.styleId)
        this.loadmidMaterialQty(this.styleId)
        this.loadLargeMaterialQty(this.styleId)
        this.loadStylebyId(this.styleId);
        if(typeof document !== "undefined"){
          this.calculateTotal('totalprice','smallTable',4,5)
          this.calculateTotal('totalPriceMid','mediumTable',4,5)
          this.calculateTotal('totalPriceLarge','largeTable',4,5)
          this.calculateTotal('laborCostTotal','laborCostTable',1,2)
          console.log("defined")
        }
        // console.log("undefined")
    
  }
  
  ngAfterViewInit(): void{
  //   if(typeof document !== "undefined"){
  //   this.calculateTotal('totalprice','smallTable',4,5)
  //   this.calculateTotal('totalPriceMid','mediumTable',4,5)
  //   this.calculateTotal('totalPriceLarge','largeTable',4,5)
  //   this.calculateTotal('laborCostTotal','laborCostTable',1,2)
  // }
  }

  //style find by id
  loadStylebyId(styleId:number){
    this.service.getStyleById(this.styleId).subscribe({
      next: res => {
        this.styleData = res
      },
      error: err => {
        console.log(err);
      }
    })
  }

  
  //labor cost list
  loadLaborCost(id: number) {
    this.service.getLaborCostByStyleId(id).subscribe({
      next: res => {
        this.cost = res
      },
      error: err => {
        console.log(err);
      }
    })
  }
  //attachment list
  loadAttachment(id: number) {
    this.service.getAttachmentByStyleId(id).subscribe({
      next: res => {
        this.imageList = res
      },
      error: err => {
        console.log(err);
      }
    })
  }
  //small Material Qty list
  loadsmallMaterialQty(id: number) {
    this.service.getstyleMatByStyleId(id,3).subscribe({
      next: res => {
        this.smallQty = res
        
        
      },
      error: err => {
        console.log(err);
      }
    })
  }
  //medium Material Qty list
  loadmidMaterialQty(id: number) {
    this.service.getstyleMatByStyleId(id,2).subscribe({
      next: res => {
        this.midQty = res
        
      },
      error: err => {
        console.log(err);
      }
    })
  }
  //large Material Qty list
  loadLargeMaterialQty(id: number) {
    this.service.getstyleMatByStyleId(id,1).subscribe({
      next: res => {
        this.largeQty = res
        
      },
      error: err => {
        console.log(err);
      }
    })
  }
  
  private calculateTotal(tdName: string, myTable: string, qcell: number, ucell: number): void {
    if(typeof document !== "undefined"){
    const table = document.getElementById(myTable) as HTMLTableElement;
    let totalCost = 0;

    for (let i = 1; i < table.rows.length; i++) {
      const quantityCell = table.rows[i].cells[qcell];
      const unitPriceCell = table.rows[i].cells[ucell];

      if (quantityCell && unitPriceCell) {
        const quantity = parseFloat(quantityCell.textContent!.trim()) || 0;
        const unitPrice = parseFloat(unitPriceCell.textContent!.trim()) || 0;
        let subCost = (quantity * unitPrice);
        table.rows[i].cells[ucell+1].innerHTML=subCost.toString();
        // console.log("sub"+i+":"+subCost);
        totalCost += subCost;
      }
    }
    console.log("inside calculatetotal")
    document.getElementById(tdName)!.innerHTML = totalCost.toFixed(1);
  }
}
}
