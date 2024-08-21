import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Size } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleService } from '../../../services/sale.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrl: './size.component.css'
})
export class SizeComponent implements OnInit{

  size:Size[]=[]
  sizeForm!:FormGroup
  sizeModel:Size=new Size();
  title:string="Size list";
  title2:string="Size Entry Form";
  menuType: boolean=true;
  //font awesome icon list
  fatrash=faTrash;
  editicon=faPenToSquare

  constructor(
    private saleService:SaleService,
    private formBuilder:FormBuilder,
  
  ){}

  ngOnInit(): void {
    this.loadSize();
    this.initSizeForm();
  }

  initSizeForm(){
    this.sizeForm=this.formBuilder.group({
      name:['',Validators.required]
    })
  }

  //all size list
  private loadSize(){
    this.saleService.getAllSize().subscribe({
      next:res=>{
        this.size=res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  //delete a size
  deleteSize(sizeId:number){
    this.saleService.deleteSize(sizeId).subscribe({
      next:res=>{
        console.log("Size deleted",res)
        alert("Size deleted.")
        this.loadSize();
          
      },
      error:er=>{
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new size
  onSubmit(){
    if(this.sizeForm.valid){
      const sizeData:Size =this.sizeForm.value;
      this.saleService.createSize(sizeData).subscribe({
        next:res=>{
          console.log("Size saved",res)
          alert("Size saved.")
          this.loadSize();
          this.sizeForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  // set data on form to update
  onEditById(sizeRow:any){
    this.menuType=false;
    this.sizeModel.id=sizeRow.id;
    this.sizeForm.controls['name'].setValue(sizeRow.name)
  }
  //update size name
 editSize(){
    if(this.sizeForm.valid){
      this.sizeModel.name=this.sizeForm.value.name
      this.saleService.updateSize(this.sizeModel.id,this.sizeModel).subscribe({
        next:res=>{
          console.log("Size updated",res)
          alert("Size updated.")
          this.loadSize();
          this.sizeForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not updated")
        }
      })
    }
  }

}
