import { Component, OnInit } from '@angular/core';
import { MeasuremantAttachment, MeasuremntDetails, RawMaterial, Style } from '../../../model/sale.model';
import { SaleService } from '../../../services/sale.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-techpage',
  templateUrl: './techpage.component.html',
  styleUrl: './techpage.component.css'
})
export class TechpageComponent implements OnInit {

  material: RawMaterial[] = []
  measurement: MeasuremntDetails[] = []
  attachment: MeasuremantAttachment[] = []
  //style variable for single object
  styleData: Style = new Style();
  styleId: any
  constructor(
    private service: SaleService,
    private routeA: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.routeA.params.subscribe(param => this.styleId = param['id'])
    console.log(this.styleId)
    this.loadStylebyId(this.styleId)
    this.loadMaterialbyId(this.styleId)
    this.loadmDetailsbyId(this.styleId)
    this.loadmAttachmentbyId(this.styleId)
  }

  //style find by id
  loadStylebyId(styleId: number) {
    this.service.getStyleById(this.styleId).subscribe({
      next: res => {
        this.styleData = res
      },
      error: err => {
        console.log(err);
      }
    })
  }

  //Raw Matrial find by style id
  loadMaterialbyId(styleId:number){
    this.service.getrawMaterialByStyleId(this.styleId).subscribe({
      next: res => {
        this.material = res
      },
      error: err => {
        console.log(err);
      }
    })
  }
  //Measurement Details find by style id
  loadmDetailsbyId(styleId:number){
    this.service.getMeasurementByStyleId(this.styleId).subscribe({
      next: res => {
        this.measurement = res
      },
      error: err => {
        console.log(err);
      }
    })
  }
  //Measurement Attachment find by style id
  loadmAttachmentbyId(styleId:number){
    this.service.getSketchByStyleId(this.styleId).subscribe({
      next: res => {
        this.attachment = res
      },
      error: err => {
        console.log(err);
      }
    })
  }


}
