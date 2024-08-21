import { Component, OnInit } from '@angular/core';
import { Warehouse } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css'
})
export class WarehouseComponent implements OnInit{

  warehouse:Warehouse[]=[]
  warehouseForm!:FormGroup
  warehouseModel:Warehouse=new Warehouse();
  title:string="Warehouse list";
  title2:string="Warehouse Entry Form";
  
  menuType: boolean=true;
  //font awesome icon list
  fatrash=faTrash;
  editicon=faPenToSquare
  constructor(
    private service:SaleService,
    private formBuilder:FormBuilder
  ){}
  ngOnInit(): void {
    this.initWarehouseForm();
    this.loadWarehouse()
  }

  initWarehouseForm(){
    this.warehouseForm=this.formBuilder.group({
      name:['',Validators.required],
      city:['',Validators.required],
      contact:['',Validators.required] 
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

  //delete a Warehouse
  deleteWarehouse(warehouseId:number){
    this.service.deleteWarehouse(warehouseId).subscribe({
      next:res=>{
        console.log("Warehouse deleted",res)
        alert("Warehouse deleted.")
        this.loadWarehouse();
          
      },
      error:er=>{
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new Warehouse
  onSubmit(){
    if(this.warehouseForm.valid){
      
      const warehouseData:Warehouse=this.warehouseForm.value;
      this.service.createWarehouse(warehouseData).subscribe({
        next:res=>{
          console.log("Warehouse saved",res)
          alert("Warehouse saved.")
          this.loadWarehouse();
          this.warehouseForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  // set data on form to update
onEditById(warehouseRow:any){
  this.menuType=false;
  this.warehouseModel.id=warehouseRow.id;
  this.warehouseForm.controls['name'].setValue(warehouseRow.name)
  this.warehouseForm.controls['city'].setValue(warehouseRow.city)
  this.warehouseForm.controls['contact'].setValue(warehouseRow.contact)
}

//update warehouse data
editWarehouse(){
  if(this.warehouseForm.valid){
    
    this.warehouseModel.name=this.warehouseForm.value.name
    this.warehouseModel.city=this.warehouseForm.value.city
    this.warehouseModel.contact=this.warehouseForm.value.contact

    this.service.updateWarehouse(this.warehouseModel.id,this.warehouseModel).subscribe({
      next:res=>{
        
        console.log("Warehouse updated")
        alert("Warehouse updated.")
        this.loadWarehouse();
        this.warehouseForm.reset();
        // console.log("inside vendor update")
      },
      error:er=>{
        console.log(er)
        alert("Data not updated")
      }
    })
  }
}

}
