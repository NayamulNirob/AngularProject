import { Component, OnInit } from '@angular/core';
import { AdjustmentMaterail, OrderDetails, RawMaterial, StockAdjustment, Warehouse } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-adjustment-material',
  templateUrl: './adjustment-material.component.html',
  styleUrl: './adjustment-material.component.css'
})
export class AdjustmentMaterialComponent implements OnInit{
  
  adMaterial:AdjustmentMaterail[]=[]
  material:RawMaterial[]=[]
  stockAdjust: StockAdjustment[] = []
  order:OrderDetails[]=[]
  warehouse:Warehouse[]=[]

  adMaterialForm!:FormGroup
  adMaterialModel:AdjustmentMaterail=new AdjustmentMaterail();
  title:string="Adjustment Material List";
  title2:string="Adjustment Material Entry Form";
  menuType: boolean=true;
  //font awesome icon list
  fatrash=faTrash;
  editicon=faPenToSquare

  constructor(
    private service:SaleService,
    private formBuilder:FormBuilder,
    
  ){}

  ngOnInit(): void {
  this.initAdMaterialForm()
  this.loadRawMaterial()
  this.loadAdMaterial()
  this.loadStockAdjustment()
  this.loadOrder()
  this.loadWarehouse()
  }

  initAdMaterialForm(){
    this.adMaterialForm=this.formBuilder.group({
      remarks:['',Validators.required],
      quantity:['',Validators.required],
      price:['',Validators.required],
      rawMaterialId:['',Validators.required],
      stockAdjustmentId:['',Validators.required],
      // orderDetailsId:[''],
      wareHouseId:['',Validators.required]
     

      
    })
  }

  //all Warehouse list
  private loadWarehouse(){
    this.service.getAllWarehouse().subscribe({
      next:res=>{
        this.warehouse=res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  //all material list
  private loadRawMaterial(){
    this.service.getAllRawMaterial().subscribe({
      next:res=>{
        this.material=res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  //all Stock Adjustment list
  private loadStockAdjustment() {
    this.service.getAllStockAdjustment().subscribe({
      next: res => {
        this.stockAdjust = res;
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

  //all Adjustment Material list
  private loadAdMaterial(){
    this.service.getAllAdjustmentMaterial().subscribe({
      next:res=>{
        this.adMaterial=res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  //delete a Adjustment Material
  deleteAdjustmentMaterial(adMaterialId:number){
    this.service.deleteAdjustmentMaterial(adMaterialId).subscribe({
      next:res=>{
        console.log("Adjustment Material deleted",res)
        alert("Adjustment Material deleted.")
        this.loadAdMaterial();
        
        
      },
      error:er=>{
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new Adjustment Material
  onSubmit(){
    if(this.adMaterialForm.valid){
      const adMaterialData:AdjustmentMaterail =this.adMaterialForm.value;
      this.service.createAdjustmentMaterial(adMaterialData).subscribe({
        next:res=>{
          console.log("Adjustment Material saved",res)
          alert("Adjustment Material saved.")
          this.loadAdMaterial();
          this.adMaterialForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  // set data on form to update
  onEditById(adMatRow:any){
    this.menuType=false;
    this.adMaterialModel.id=adMatRow.id;
    this.adMaterialForm.controls['remarks'].setValue(adMatRow.remarks)
    this.adMaterialForm.controls['quantity'].setValue(adMatRow.quantity)
    this.adMaterialForm.controls['price'].setValue(adMatRow.price)
    this.adMaterialForm.controls['stockAdjustmentId'].setValue(adMatRow.stockAdjustmentId.name)
    this.adMaterialForm.controls['rawMaterialId'].setValue(adMatRow.rawMaterialId.name)
    this.adMaterialForm.controls['orderDetailsId'].setValue(adMatRow.orderDetailsId.id)
    this.adMaterialForm.controls['wareHouseId'].setValue(adMatRow.wareHouseId.name)
  }

  //update material name
 editmaterial(){
  if(this.adMaterialForm.valid){
    this.adMaterialModel.remarks=this.adMaterialForm.value.remarks
    this.adMaterialModel.quantity=this.adMaterialForm.value.quantity
    this.adMaterialModel.price=this.adMaterialForm.value.price
    this.adMaterialModel.stockAdjustmentId=this.adMaterialForm.value.stockAdjustmentId
    this.adMaterialModel.rawMaterialId=this.adMaterialForm.value.rawMaterialId
    // this.adMaterialModel.orderDetailsId=this.adMaterialForm.value.orderDetailsId
    this.adMaterialModel.wareHouseId=this.adMaterialForm.value.wareHouseId
    this.service.updateAdjustmentMaterial(this.adMaterialModel.id,this.adMaterialModel).subscribe({
      next:res=>{
        console.log("Adjustment Material updated",res)
        alert("Adjustment Material updated.")
        this.loadAdMaterial();
        this.adMaterialForm.reset();
      },
      error:er=>{
        console.log(er)
        alert("Data not updated")
      }
    })
  }
}



}
