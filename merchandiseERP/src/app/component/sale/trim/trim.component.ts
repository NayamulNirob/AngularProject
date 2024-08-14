import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trim } from '../../../model/sale.model';
@Component({
  selector: 'app-trim',
  templateUrl: './trim.component.html',
  styleUrl: './trim.component.css'
})
export class TrimComponent implements OnInit{

  trim:Trim[]=[]
  trimForm!:FormGroup
  trimModel:Trim=new Trim();
  title:string="Trim List";
  title2:string="Trim Entry Form";
  menuType: boolean=true;
  //font awesome icon list
  fatrash=faTrash;
  editicon=faPenToSquare
  
  constructor(
    private saleService:SaleService,
    private formBuilder:FormBuilder
  ){}
  ngOnInit(): void {
    this.initTrimForm();
    this.loadTrim();
    
  }
  
  initTrimForm(){
    this.trimForm=this.formBuilder.group({
      name:['',Validators.required]
    })
  }
  //all trim list
  private loadTrim(){
    this.saleService.getAllTrim().subscribe({
      next:res=>{
        this.trim=res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }
  //delete a trim
  deleteTrim(trimId:number){
    this.saleService.deleteTrim(trimId).subscribe({
      next:res=>{
        console.log("Trim deleted",res)
        alert("Trim deleted.")
        this.loadTrim();
        //after delete page reload to dashboard .fix it to list page.
        // this.router.navigate(['/trim'])  
      },
      error:er=>{
        console.log(er)
        alert("Data not deleted")
      }
    })
  }
   // create new trim
   onSubmit(){
    if(this.trimForm.valid){
      const trimData:Trim =this.trimForm.value;
      this.saleService.createTrim(trimData).subscribe({
        next:res=>{
          console.log("Trim saved",res)
          alert("Trim saved.")
          this.loadTrim();
          this.trimForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  // set data on form to update
  onEditById(trimRow:any){
    this.menuType=false;
    this.trimModel.id=trimRow.id;
    this.trimForm.controls['name'].setValue(trimRow.name)
  }
  //update trim name
 editTrim(){
    if(this.trimForm.valid){
      this.trimModel.name=this.trimForm.value.name
      this.saleService.updateTrim(this.trimModel.id,this.trimModel).subscribe({
        next:res=>{
          console.log("Trim updated",res)
          alert("Trim updated.")
          this.loadTrim();
          this.trimForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not updated")
        }
      })
    }
  }

}
