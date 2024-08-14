import { Component, OnInit } from '@angular/core';
import { Purchase, PurchaseStatus, RawMaterial, Vendors, Warehouse } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faSearchPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit{
  
  purchase:Purchase[]=[]
  warehouse:Warehouse[]=[]
  material:RawMaterial[]=[]
  status: PurchaseStatus[]=[]
  vendor:Vendors[]=[]

  purchaseForm!:FormGroup
  purchaseModel:Purchase=new Purchase();
  title:string="Purchase List";
  title2:string="Purchase Entry Form";
  menuType: boolean=true;
  //font awesome icon list
  fatrash=faTrash;
  editicon=faPenToSquare
  fasearch=faSearchPlus

  constructor(
    private service:SaleService,
    private formBuilder:FormBuilder,
    
    
  ){}
  ngOnInit(): void {
  this.initPurchaseForm();
  this.loadWarehouse()
  this.loadRawMaterial()
  this.loadPurchaseStatus()
  this.loadVendors()
  this.loadPurchase()
  }

  initPurchaseForm(){
    this.purchaseForm=this.formBuilder.group({
      purchaseDate:['',Validators.required],
      deliveryDate:['',Validators.required],
      price:['',Validators.required],
      quantity:['',Validators.required],
      paid:['',Validators.required],
      total:[''],
      
      vendorsId:['',Validators.required],
      statusId:['',Validators.required],
      wareHouseId:['',Validators.required],
      rawMaterialId:['',Validators.required]
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
  //all Purchase Status list
  private loadPurchaseStatus() {
    this.service.getAllPurchaseStatus().subscribe({
      next: res => {
        this.status = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  //all vendors list
  private loadVendors(){
    this.service.getAllVendors().subscribe({
      next:res=>{
        this.vendor=res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  //all Purchase list
  private loadPurchase(){
    this.service.getAllPurchase().subscribe({
      next:res=>{
        this.purchase=res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  //delete a purchase
  deletePurchase(purchaseId:number){
    this.service.deletePurchase(purchaseId).subscribe({
      next:res=>{
        console.log("Purchase deleted",res)
        alert("Purchase deleted.")
        this.loadPurchase();
          
      },
      error:er=>{
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new purchase
  onSubmit(){
    if(this.purchaseForm.valid){
      
      const purchaseData:Purchase=this.purchaseForm.value;
      this.service.createPurchase(purchaseData).subscribe({
        next:res=>{
          console.log("Purchase saved",res)
          alert("Purchase saved.")
          this.loadPurchase();
          this.purchaseForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  //Purchase By Id
  private findByPurchase(id:number){
    this.service.getPurchaseById(id).subscribe({
      next:res=>{
        this.purchaseForm.patchValue(res);
        this.purchaseForm.controls['statusId'].patchValue(res.statusId?.name);
        this.purchaseForm.controls['wareHouseId'].patchValue(res.wareHouseId?.name);
        this.purchaseForm.controls['vendorsId'].patchValue(res.vendorsId?.company);
        this.purchaseForm.controls['rawMaterialId'].patchValue(res.rawMaterialId?.name);
        
      },
      error:err=>{
        console.log(err);
      }
    })
  }
  // set data on form to update
onEditById(purchaseRow:any){
  this.menuType=false;
  this.purchaseModel.id=purchaseRow.id;
  this.findByPurchase(purchaseRow.id);
  
  // this.purchaseForm.controls['statusId'].setValue(purchaseRow.statusId.name)
  // this.purchaseForm.controls['rawMaterialId'].setValue(purchaseRow.rawMaterialId.name)
  // this.purchaseForm.controls['purchaseDate'].setValue(purchaseRow.purchaseDate)
  // this.purchaseForm.controls['deliveryDate'].setValue(purchaseRow.deliveryDate)
  // this.purchaseForm.controls['price'].setValue(purchaseRow.price)
  // this.purchaseForm.controls['quantity'].setValue(purchaseRow.quantity)
  // this.purchaseForm.controls['paid'].setValue(purchaseRow.paid)
  // this.purchaseForm.controls['total'].setValue(purchaseRow.total)
  // this.purchaseForm.controls['vendorId'].setValue(purchaseRow.vendorId.company)
  // this.purchaseForm.controls['wareHouseId'].setValue(purchaseRow.wareHouseId.name)
  
}

//update purchase data
editPurchase(){
  if(this.purchaseForm.valid){
    
    this.purchaseModel.purchaseDate=this.purchaseForm.value.purchaseDate
    this.purchaseModel.deliveryDate=this.purchaseForm.value.deliveryDate
    this.purchaseModel.price=this.purchaseForm.value.price
    this.purchaseModel.quantity=this.purchaseForm.value.quantity
    this.purchaseModel.paid=this.purchaseForm.value.paid
    this.purchaseModel.total=this.purchaseForm.value.total
    this.purchaseModel.vendorsId=this.purchaseForm.value.vendorsId
    this.purchaseModel.wareHouseId=this.purchaseForm.value.wareHouseId
    this.purchaseModel.statusId=this.purchaseForm.value.statusId
    this.purchaseModel.rawMaterialId=this.purchaseForm.value.rawMaterialId

    this.service.updatePurchase(this.purchaseModel.id,this.purchaseModel).subscribe({
      next:res=>{
        
        console.log("Purchase updated",res)
        alert("Purchase updated.")
        this.loadPurchase();
        this.purchaseForm.reset();
        
      },
      error:er=>{
        console.log(er)
        alert("Data not updated")
      }
    })
  }
}



}
