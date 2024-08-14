import { Component, OnInit } from '@angular/core';
import { UOM } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-uom',
  templateUrl: './uom.component.html',
  styleUrl: './uom.component.css'
})
export class UomComponent implements OnInit{

  uom:UOM[]=[]
  uomForm !:FormGroup
  uomModel:UOM=new UOM();
  title:string="Unit of Measurement list";
  title2:string="Unit of Measurement Entry Form";
  menuType: boolean=true;
  //font awesome icon list
  fatrash=faTrash;
  editicon=faPenToSquare
  constructor(
    private service:SaleService,
    private formBuilder:FormBuilder,
  ){}
  ngOnInit(): void {
    this.initSizeForm()
    this.loadUOM()

  }
  initSizeForm(){
    this.uomForm=this.formBuilder.group({
      name:['',Validators.required]
    })
  }

  //all uom list
  private loadUOM(){
    this.service.getAllUOM().subscribe({
      next:res=>{
        this.uom=res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  //delete a unit of measurement
  deleteUOM(uomId:number){
    this.service.deleteUOM(uomId).subscribe({
      next:res=>{
        console.log("Unit of Measurement deleted",res)
        alert("Unit of Measurement deleted.")
        this.loadUOM();
          
      },
      error:er=>{
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new size
  onSubmit(){
    if(this.uomForm.valid){
      const uomData:UOM =this.uomForm.value;
      this.service.createUOM(uomData).subscribe({
        next:res=>{
          console.log("Unit of Measurement saved",res)
          alert("Unit of Measurement saved.")
          this.loadUOM();
          this.uomForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  // set data on form to update
  onEditById(uomRow:any){
    this.menuType=false;
    this.uomModel.id=uomRow.id;
    this.uomForm.controls['name'].setValue(uomRow.name)
  }

   //update size name
 editUOM(){
  if(this.uomForm.valid){
    this.uomModel.name=this.uomForm.value.name
    this.service.updateUOM(this.uomModel.id,this.uomModel).subscribe({
      next:res=>{
        console.log("Unit of Measurement updated",res)
        alert("Unit of Measurement updated.")
        this.loadUOM();
        this.uomForm.reset();
      },
      error:er=>{
        console.log(er)
        alert("Data not updated")
      }
    })
  }
}

}
