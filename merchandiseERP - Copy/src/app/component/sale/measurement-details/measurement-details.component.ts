import { Component, OnInit } from '@angular/core';
import { MeasuremntDetails, Style } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-measurement-details',
  templateUrl: './measurement-details.component.html',
  styleUrl: './measurement-details.component.css'
})
export class MeasurementDetailsComponent implements OnInit{

  details:MeasuremntDetails[]=[]
  styleCode:Style[]=[]
  detailsForm!:FormGroup;
  detailsModel:MeasuremntDetails=new MeasuremntDetails();
  title:string="Measuremnt Details list";
  title2:string="Measuremnt Details Entry Form";
  totalItems:number=0
  menuType: boolean=true;
  //font awesome icon list
  fatrash=faTrash;
  editicon=faPenToSquare

  constructor(
    private service:SaleService,
    private formBuilder:FormBuilder
  ){}

  ngOnInit(): void {
    this.initstyleForm();
    this.loadMeasurementDetails()
    this.loadStyleCode()
  }
  initstyleForm(){
    this.detailsForm=this.formBuilder.group({
      description:['',Validators.required],
      tolerance:['',Validators.required],
      small:['',Validators.required],
      medium:['',Validators.required],
      large:['',Validators.required],
      styleId:['',Validators.required]
    })
  }

  //all measurement Details list

  private loadMeasurementDetails(){
    this.service.getAllMeasurementDetails().subscribe({
      next:res=>{
        this.details=res;
        this.totalItems=this.details.length;
        // console.log(`TotalItems= ${this.totalItems}`)
      },
      error:err=>{
        console.log(err);
      }
    })
  }
  //all style code list
  private loadStyleCode(){
    this.service.getAllStyle().subscribe({
      next:res=>{
        this.styleCode=res
      },
      error:err=>{
        console.log(err);
      }
    })
  }
  // delete a mesurement details
  deleteMesurementDet(detailsId:number){
    this.service.deleteMeasurementDetails(detailsId).subscribe({
      next:res=>{
        console.log("Measurement Details deleted.",res)
        alert("Measurement Details deleted.")
        this.loadMeasurementDetails()
      },
      error:er=>{
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  //create new Measurement Details.
  onSubmit(){
    if(this.detailsForm.valid){
      const detailsData:MeasuremntDetails=this.detailsForm.value;
      this.service.createMeasurementDetails(detailsData).subscribe({
        next:res=>{
          console.log("Measurement Details saved",res)
          alert("Measurement Details saved.")
          this.loadMeasurementDetails();
          this.detailsForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }
  //set data on form to update
  onEditById(detailsRow:any){
    this.menuType=false;
    this.detailsModel.id=detailsRow.id;
    this.detailsForm.controls["description"].setValue(detailsRow.description)
    this.detailsForm.controls["tolerance"].setValue(detailsRow.tolerance)
    this.detailsForm.controls["small"].setValue(detailsRow.small)
    this.detailsForm.controls["medium"].setValue(detailsRow.medium)
    this.detailsForm.controls["large"].setValue(detailsRow.large)
    this.detailsForm.controls["styleId"].setValue(detailsRow.styleId.code)
    
  }
  //update Measurement Details
  editMeasurementDetails(){
    if(this.detailsForm.valid){
      this.detailsModel.description=this.detailsForm.value.description
      this.detailsModel.tolerance=this.detailsForm.value.tolerance
      this.detailsModel.small=this.detailsForm.value.small
      this.detailsModel.medium=this.detailsForm.value.medium
      this.detailsModel.large=this.detailsForm.value.large
      this.detailsModel.styleId=this.detailsForm.value.styleId
      this.service.updateMeasurementDetails(this.detailsModel.id,this.detailsModel).subscribe({
        next:res=>{
          console.log("Measurement Details updated",res)
          alert("Measurement Details updated.")
          this.loadMeasurementDetails();
          this.detailsForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not updated")
        }
      })

    }
  }

}
