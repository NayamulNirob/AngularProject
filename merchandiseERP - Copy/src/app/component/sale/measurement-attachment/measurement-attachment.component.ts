import { Component, OnInit } from '@angular/core';
import { MeasuremantAttachment, Style } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-measurement-attachment',
  templateUrl: './measurement-attachment.component.html',
  styleUrl: './measurement-attachment.component.css'
})
export class MeasurementAttachmentComponent implements OnInit {

  attachment: MeasuremantAttachment[] = []
  style: Style[] = []
  attachmentForm!: FormGroup
  attachmentModel: MeasuremantAttachment = new MeasuremantAttachment();
  title: string = "Measuremant Attachment List";
  title2: string = "Measuremant Attachment Entry Form";
  menuType: boolean = true;
  //font awesome icon list
  fatrash = faTrash;
  editicon = faPenToSquare

  constructor(
    private service: SaleService,
    private formBuilder: FormBuilder,

  ) { }
  ngOnInit(): void {
    this.initattachmentForm()
    this.loadstyle()
    this.loadattachment()
  }

  initattachmentForm() {
    this.attachmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      styleId: ['', Validators.required]
      // attachment:['',Validators.required]
    })
  }

  //all style list
  private loadstyle() {
    this.service.getAllStyle().subscribe({
      next: res => {
        this.style = res
      },
      error: err => {
        console.log(err);
      }
    })
  }

  //all attachment list
  private loadattachment(){
    this.service.getAllMeasurementAttachment().subscribe({
      next:res=>{
        this.attachment=res
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  //delete a attachment
  deleteattachment(attachmentId:number){
    this.service.deleteMeasurementAttachment(attachmentId).subscribe({
      next:res=>{
        console.log("Measuremant Attachment deleted",res)
        alert("Measuremant Attachment deleted.")
        this.loadattachment();
        
        
      },
      error:er=>{
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new material
  onSubmit(){
    if(this.attachmentForm.valid){
      const attachmentData:MeasuremantAttachment =this.attachmentForm.value;
      this.service.createMeasurementAttachment(attachmentData).subscribe({
        next:res=>{
          console.log("Raw Material saved",res)
          alert("Raw Material saved.")
          this.loadattachment();
          this.attachmentForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  onEditById(attachmentRow:any){
    this.menuType=false;
    this.attachmentModel.id=attachmentRow.id;
    this.attachmentForm.controls['name'].setValue(attachmentRow.name)
    this.attachmentForm.controls['styleId'].setValue(attachmentRow.styleId.code)
  }


  editattachment(){
    if(this.attachmentForm.valid){
      this.attachmentModel.name=this.attachmentForm.value.name
      this.attachmentModel.styleId=this.attachmentForm.value.styleId
      this.service.updateMeasurementAttachment(this.attachmentModel.id,this.attachmentModel).subscribe({
        next:res=>{
          console.log("Measuremant Attachment updated",res)
          alert("Measuremant Attachment updated.")
          this.loadattachment();
          this.attachmentForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not updated")
        }
      })
    }
  }








}
