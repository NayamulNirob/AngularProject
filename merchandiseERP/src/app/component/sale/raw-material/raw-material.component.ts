import { Component, OnInit } from '@angular/core';
import { RawMaterial, RawMaterialCat, Style, UOM, Vendors } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrl: './raw-material.component.css'
})
export class RawMaterialComponent implements OnInit{
  
  material:RawMaterial[]=[]
  style:Style[]=[]
  materialCat:RawMaterialCat[]=[]
  uom:UOM[]=[]
  vendor:Vendors[]=[]

  materialForm!:FormGroup
  materialModel:RawMaterial=new RawMaterial();
  title:string="Raw Material List";
  title2:string="Raw Material Entry Form";
  menuType: boolean=true;
  //font awesome icon list
  fatrash=faTrash;
  editicon=faPenToSquare

  constructor(
    private service:SaleService,
    private formBuilder:FormBuilder,
    
  ){}
  
  ngOnInit(): void {
  this.initmaterialForm()
  this.loadmaterial()
  this.loadstyle()
  this.loadmaterialCat()
  this.loadUOM()
  this.loadVendors()
  }

  initmaterialForm(){
    this.materialForm=this.formBuilder.group({
      name:['',Validators.required],
      description:['',Validators.required],
      unitPrice:['',Validators.required],
      styleId:['',Validators.required],
      rawMaterialCatId:['',Validators.required],
      uomId:['',Validators.required],
      vendorId:['',Validators.required]
     

      // attachment:['',Validators.required]
    })
  }

  //all style list
  private loadstyle(){
    this.service.getAllStyle().subscribe({
      next:res=>{
        this.style=res
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  //all materialCat list
  private loadmaterialCat(){
    this.service.getAllRawMaterialCat().subscribe({
      next:res=>{
        this.materialCat=res;
      },
      error:err=>{
        console.log(err);
      }
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

  //all material list
  private loadmaterial(){
    this.service.getAllRawMaterial().subscribe({
      next:res=>{
        this.material=res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  //delete a material
  deletematerial(materialId:number){
    this.service.deleteRawMaterial(materialId).subscribe({
      next:res=>{
        console.log("Raw Material deleted",res)
        alert("Raw Material deleted.")
        this.loadmaterial();
        
        
      },
      error:er=>{
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new material
  onSubmit(){
    if(this.materialForm.valid){
      const materialData:RawMaterial =this.materialForm.value;
      this.service.createRawMaterial(materialData).subscribe({
        next:res=>{
          console.log("Raw Material saved",res)
          alert("Raw Material saved.")
          this.loadmaterial();
          this.materialForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  // set data on form to update
  onEditById(materialRow:any){
    this.menuType=false;
    this.materialModel.id=materialRow.id;
    this.materialForm.controls['name'].setValue(materialRow.name)
    this.materialForm.controls['description'].setValue(materialRow.description)
    this.materialForm.controls['unitPrice'].setValue(materialRow.unitPrice)
    this.materialForm.controls['styleId'].setValue(materialRow.styleId.code)
    this.materialForm.controls['rawMaterialCatId'].setValue(materialRow.rawMaterialCatId.name)
    this.materialForm.controls['uomId'].setValue(materialRow.uomId.name)
    this.materialForm.controls['vendorId'].setValue(materialRow.vendorId.company)
  }

  //update material name
 editmaterial(){
  if(this.materialForm.valid){
    this.materialModel.name=this.materialForm.value.name
    this.materialModel.description=this.materialForm.value.description
    this.materialModel.unitPrice=this.materialForm.value.unitPrice
    this.materialModel.styleId=this.materialForm.value.styleId
    this.materialModel.rawMaterialCatId=this.materialForm.value.rawMaterialCatId
    this.materialModel.uomId=this.materialForm.value.uomId
    this.materialModel.vendorId=this.materialForm.value.vendorId
    this.service.updateRawMaterial(this.materialModel.id,this.materialModel).subscribe({
      next:res=>{
        console.log("Raw Material updated",res)
        alert("Raw Material updated.")
        this.loadmaterial();
        this.materialForm.reset();
      },
      error:er=>{
        console.log(er)
        alert("Data not updated")
      }
    })
  }
}








}
