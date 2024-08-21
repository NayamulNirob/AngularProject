import { Component, OnInit } from '@angular/core';
import { StyleCategories } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleService } from '../../../services/sale.service';
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-style-categories',
  templateUrl: './style-categories.component.html',
  styleUrl: './style-categories.component.css'
})
export class StyleCategoriesComponent implements OnInit{

  styleCat:StyleCategories[]=[]
  styleCatForm!:FormGroup
  styleCatModel:StyleCategories=new StyleCategories();
  title:string="Style categories list";
  title2:string="Style categories Entry Form";
  menuType: boolean=true;
  //font awesome icon list
  fatrash=faTrash;
  editicon=faPenToSquare
  constructor(
    private saleService:SaleService,
    private formBuilder:FormBuilder
  ){}

  ngOnInit(): void {
    this.loadStyleCategories();
    this.initStyleCatForm();

  }


  initStyleCatForm(){
    this.styleCatForm=this.formBuilder.group({
      name:['',Validators.required]
    })
  }

//get all style categories start
 private loadStyleCategories(){
  this.saleService.getAllstyleCat().subscribe({
    next:res =>{
      this.styleCat=res;
    },
    error:err=>{
      console.log(err);
    }
  })
 }
 
//get all style categories end
onSubmit(){
  if(this.styleCatForm.valid){
    const styleCatData:StyleCategories =this.styleCatForm.value;
    this.saleService.createstyleCat(styleCatData).subscribe({
      next:res=>{
        console.log("Style category saved",res)
        alert("Style category saved.")
        this.loadStyleCategories();
        this.styleCatForm.reset();
      },
      error:er=>{
        console.log(er)
        alert("Data not saved")
      }
    })
  }
}

deleteStyleCat(styleCatId:number){
  this.saleService.deletestyleCat(styleCatId).subscribe({
    next:res=>{
      console.log("Style category deleted",res)
      alert("Style category deleted.")
      this.loadStyleCategories();
     
    },
    error:er=>{
      console.log(er)
      alert("Data not deleted")
    }
  })
}

onEditById(cate:any){
  this.menuType=false;
  this.styleCatModel.id=cate.id;
  this.styleCatForm.controls['name'].setValue(cate.name)
}

editStyleCat(){
  if(this.styleCatForm.valid){
    this.styleCatModel.name=this.styleCatForm.value.name
    this.saleService.updatestyleCat(this.styleCatModel.id,this.styleCatModel).subscribe({
      next:res=>{
        console.log("Style category updated",res)
        alert("Style category updated.")
        this.loadStyleCategories();
        this.styleCatForm.reset();
      },
      error:er=>{
        console.log(er)
        alert("Data not updated")
      }
    })
  }
}




}
