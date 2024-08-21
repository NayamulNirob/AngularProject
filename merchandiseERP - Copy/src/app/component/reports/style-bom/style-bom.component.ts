import { Component, OnInit } from '@angular/core';
import { LaborCost, Style, StyleAttachment, StyleMaterialQty } from '../../../model/sale.model';
import { SaleService } from '../../../services/sale.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-style-bom',
  templateUrl: './style-bom.component.html',
  styleUrl: './style-bom.component.css'
})
export class StyleBomComponent implements OnInit {

  style: Style[] = []
  imageList: StyleAttachment[] = []
  cost: LaborCost[] = []
  smallQty: StyleMaterialQty[] = []
  midQty: StyleMaterialQty[] = []
  largeQty: StyleMaterialQty[] = []
  //style variable for single object
  styleData: Style = new Style();
  title: string = "Style BOM list";
  menutype: boolean = true;
  showData: string = 'when true'
  constructor(
    private service: SaleService,
    private router:Router

  ) { }
  ngOnInit(): void {
    this.loadstyle();
    
  
  }

  //all style list
  private loadstyle() {
    this.service.getAllStyle().subscribe({
      next: res => {
        this.style = res
      },
      error: err => {
        console.log(err);
      }
    })
  }

  

  //style by id
  findStyleById(styleId: number) {
    this.router.navigate(['/techpack/bom',styleId])
  }


  
 



}
