import { Component, OnInit } from '@angular/core';
import { Vendors } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.css'
})
export class VendorsComponent implements OnInit{

  vendor:Vendors[]=[]
  vendorForm!:FormGroup
  vendorModel:Vendors=new Vendors();
  title:string="Vendor list";
  title2:string="Vendor Entry Form";
  
  menuType: boolean=true;
  //font awesome icon list
  fatrash=faTrash;
  editicon=faPenToSquare
  constructor(
    private service:SaleService,
    private formBuilder:FormBuilder
  ){}
  ngOnInit(): void {
    this.initVendorsForm();
    this.loadVendors();
  }

  initVendorsForm(){
    this.vendorForm=this.formBuilder.group({
      company:['',Validators.required],
      contactPerson:['',Validators.required],
      cell:['',Validators.required],
      email:['',Validators.required],
      address:['',Validators.required]
      
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
  //delete a vendor
  deleteVendors(vendorId:number){
    this.service.deleteVendors(vendorId).subscribe({
      next:res=>{
        console.log("Vendor deleted",res)
        alert("Vendor deleted.")
        this.loadVendors();
          
      },
      error:er=>{
        console.log(er)
        alert("Data not deleted")
      }
    })
  }
  // create new vendor
  onSubmit(){
    if(this.vendorForm.valid){
      
      const vendorData:Vendors=this.vendorForm.value;
      this.service.createVendors(vendorData).subscribe({
        next:res=>{
          console.log("Vendor saved",res)
          alert("Vendor saved.")
          this.loadVendors();
          this.vendorForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }
// set data on form to update
onEditById(vendorRow:any){
  this.menuType=false;
  this.vendorModel.id=vendorRow.id;
  this.vendorForm.controls['company'].setValue(vendorRow.company)
  this.vendorForm.controls['contactPerson'].setValue(vendorRow.contactPerson)
  this.vendorForm.controls['cell'].setValue(vendorRow.cell)
  this.vendorForm.controls['email'].setValue(vendorRow.email)
  this.vendorForm.controls['address'].setValue(vendorRow.address)
}
//update vendor data
editVendors(){
  if(this.vendorForm.valid){
    
    this.vendorModel.company=this.vendorForm.value.company
    this.vendorModel.contactPerson=this.vendorForm.value.contactPerson
    this.vendorModel.cell=this.vendorForm.value.cell
    this.vendorModel.email=this.vendorForm.value.email
    this.vendorModel.address=this.vendorForm.value.address

    this.service.updateVendors(this.vendorModel.id,this.vendorModel).subscribe({
      next:res=>{
        
        console.log("Vendor updated",res)
        alert("Vendor updated.")
        this.loadVendors();
        this.vendorForm.reset();
        console.log("inside vendor update")
      },
      error:er=>{
        console.log(er)
        alert("Data not updated")
      }
    })
  }
}




}
