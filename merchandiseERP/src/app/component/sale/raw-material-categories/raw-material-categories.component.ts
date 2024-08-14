import { Component, OnInit } from '@angular/core';
import { RawMaterialCat } from '../../../model/sale.model';
import { SaleService } from '../../../services/sale.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-raw-material-categories',
  templateUrl: './raw-material-categories.component.html',
  styleUrl: './raw-material-categories.component.css'
})
export class RawMaterialCategoriesComponent implements OnInit{

  materialCat:RawMaterialCat[]=[]
  materialCatForm!:FormGroup
  materialCatModel:RawMaterialCat=new RawMaterialCat();
  title:string="Raw Material Categories List";
  title2:string="Raw Material Categories Entry Form";
  menuType: boolean=true;
  //font awesome icon list
  fatrash=faTrash;
  editicon=faPenToSquare

  constructor(
    private saleService:SaleService,
    private formBuilder:FormBuilder,
    
  ){}

  ngOnInit(): void {
    this.loadmaterialCat();
    this.initmaterialCatForm();
  }

  initmaterialCatForm(){
    this.materialCatForm=this.formBuilder.group({
      name:['',Validators.required]
    })
  }

  //all materialCat list
  private loadmaterialCat(){
    this.saleService.getAllRawMaterialCat().subscribe({
      next:res=>{
        this.materialCat=res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  //delete a materialCat
  deletematerialCat(materialCatId:number){
    this.saleService.deleteRawMaterialCat(materialCatId).subscribe({
      next:res=>{
        console.log("Raw Material Category deleted",res)
        alert("Raw Material Category deleted.")
        this.loadmaterialCat();
        //after delete page reload to dashboard .fix it to list page.
        
      },
      error:er=>{
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new materialCat
  onSubmit(){
    if(this.materialCatForm.valid){
      const materialCatData:RawMaterialCat =this.materialCatForm.value;
      this.saleService.createRawMaterialCat(materialCatData).subscribe({
        next:res=>{
          console.log("Raw Material Category saved",res)
          alert("Raw Material Category saved.")
          this.loadmaterialCat();
          this.materialCatForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  // set data on form to update
  onEditById(materialCatRow:any){
    this.menuType=false;
    this.materialCatModel.id=materialCatRow.id;
    this.materialCatForm.controls['name'].setValue(materialCatRow.name)
  }
  //update materialCat name
 editmaterialCat(){
    if(this.materialCatForm.valid){
      this.materialCatModel.name=this.materialCatForm.value.name
      this.saleService.updateRawMaterialCat(this.materialCatModel.id,this.materialCatModel).subscribe({
        next:res=>{
          console.log("Raw Material Category updated",res)
          alert("Raw Material Category updated.")
          this.loadmaterialCat();
          this.materialCatForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not updated")
        }
      })
    }
  }


  

}
