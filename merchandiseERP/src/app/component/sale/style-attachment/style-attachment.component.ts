import { Component, OnInit } from '@angular/core';
import { Style, StyleAttachment } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-style-attachment',
  templateUrl: './style-attachment.component.html',
  styleUrl: './style-attachment.component.css'
})
export class StyleAttachmentComponent implements OnInit {


  attachment: StyleAttachment[] = []
  style: Style[] = []
  attachmentForm!: FormGroup
  attachmentModel: StyleAttachment = new StyleAttachment();
  title: string = "Style Attachment List";
  title2: string = "Style Attachment Entry Form";
  menuType: boolean = true;
  //font awesome icon list
  fatrash = faTrash;
  editicon = faPenToSquare

  constructor(
    private service: SaleService,
    private formBuilder: FormBuilder,

  ) { }
  ngOnInit(): void {
    this.initstyleAttForm()
    this.loadstyle()
    this.loadstyleAtt()
  }
  initstyleAttForm() {
    this.attachmentForm = this.formBuilder.group({
      styleId: ['', Validators.required],
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

  //all style Attachment list
  private loadstyleAtt() {
    this.service.getAllStyleAttachment().subscribe({
      next: res => {
        this.attachment = res
      },
      error: err => {
        console.log(err);
      }
    })
  }

  //delete a Style Attachment
  deletestyleAtt(styleAttId: number) {
    this.service.deleteStyleAttachment(styleAttId).subscribe({
      next: res => {
        console.log("Style Attachment deleted", res)
        alert("Style Attachment deleted.")
        this.loadstyleAtt();


      },
      error: er => {
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new material
  onSubmit() {
    if (this.attachmentForm.valid) {
      const styleAttData: StyleAttachment = this.attachmentForm.value;
      this.service.createStyleAttachment(styleAttData).subscribe({
        next: res => {
          console.log("Style Attachment saved", res)
          alert("Style Attachment saved.")
          this.loadstyleAtt();
          this.attachmentForm.reset();
        },
        error: er => {
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  // set data on form to update
  onEditById(styleAttRow: any) {
    this.menuType = false;
    this.attachmentForm.controls['styleId'].setValue(styleAttRow.styleId.code)
  }

  //update material name
  editstyleAtt() {
    if (this.attachmentForm.valid) {
      this.attachmentModel.styleId = this.attachmentForm.value.styleId
      this.service.updateStyleAttachment(this.attachmentModel.id, this.attachmentModel).subscribe({
        next: res => {
          console.log("Style Attachment updated", res)
          alert("Style Attachment updated.")
          this.loadstyleAtt();
          this.attachmentForm.reset();
        },
        error: er => {
          console.log(er)
          alert("Data not updated")
        }
      })
    }
  }

}
