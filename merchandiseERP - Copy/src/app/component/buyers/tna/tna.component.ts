import { Component, OnInit } from '@angular/core';
import { OrderDetails, Task, TimeAction } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-tna',
  templateUrl: './tna.component.html',
  styleUrl: './tna.component.css'
})
export class TnaComponent implements OnInit {

  tna: TimeAction[] = []
  order: OrderDetails[] = []
  task: Task[] = []
  tnaForm!: FormGroup
  tnaModel: TimeAction = new TimeAction();
  title: string = "Time & Action List";
  title2: string = "Time & Action Entry Form";
  menuType: boolean = true;
  //font awesome icon list
  fatrash = faTrash;
  editicon = faPenToSquare
  constructor(
    private service: SaleService,
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.initTNAForm()
    this.loadOrder()
    this.loadTask()
    this.loadTNA()
  }

  initTNAForm() {
    this.tnaForm = this.formBuilder.group({
      remarks: ['', Validators.required],
      expectedStartDate: ['', Validators.required],
      actualStartDate: ['', Validators.required],
      expectedEndDate: ['', Validators.required],
      actualEndDate: ['', Validators.required],
      orderId: ['', Validators.required],
      taskId: ['', Validators.required]
    })
  }

  //all Task list
  private loadTask() {
    this.service.getAllTask().subscribe({
      next: res => {
        this.task = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  //all orders list
  private loadOrder() {
    this.service.getAllOrdersDetails().subscribe({
      next: res => {
        this.order = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  //all TNA list
  private loadTNA() {
    this.service.getAllTNA().subscribe({
      next: res => {
        this.tna = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  //delete a tna
  deleteTNA(tnaId: number) {
    this.service.deleteTNA(tnaId).subscribe({
      next: res => {
        console.log("Time & Action deleted", res)
        alert("Time & Action deleted.")
        this.loadTNA();

      },
      error: er => {
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new TNA
  onSubmit() {
    if (this.tnaForm.valid) {

      const tnaData: TimeAction = this.tnaForm.value;
      this.service.createTNA(tnaData).subscribe({
        next: res => {
          console.log("Time & Action saved", res)
          alert("Time & Action saved.")
          this.loadTNA();
          this.tnaForm.reset();
        },
        error: er => {
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  // set data on form to update
  onEditById(tnaRow: any) {
    this.menuType = false;
    this.tnaModel.id = tnaRow.id;
    this.tnaForm.controls['remarks'].setValue(tnaRow.remarks)
    this.tnaForm.controls['taskId'].setValue(tnaRow.taskId.name)
    this.tnaForm.controls['orderId'].setValue(tnaRow.orderId.id)
    this.tnaForm.controls['actualEndDate'].setValue(tnaRow.actualEndDate)
    this.tnaForm.controls['expectedEndDate'].setValue(tnaRow.expectedEndDate)
    this.tnaForm.controls['actualStartDate'].setValue(tnaRow.actualStartDate)
    this.tnaForm.controls['expectedStartDate'].setValue(tnaRow.expectedStartDate)
  }

  //update TNA data
  editTNA() {
    if (this.tnaForm.valid) {

      this.tnaModel.taskId = this.tnaForm.value.taskId
      this.tnaModel.orderId = this.tnaForm.value.orderId
      this.tnaModel.actualEndDate = this.tnaForm.value.actualEndDate
      this.tnaModel.expectedEndDate = this.tnaForm.value.expectedEndDate
      this.tnaModel.actualStartDate = this.tnaForm.value.actualStartDate
      this.tnaModel.expectedStartDate = this.tnaForm.value.expectedStartDate
      this.tnaModel.remarks = this.tnaForm.value.remarks

      this.service.updateTNA(this.tnaModel.id, this.tnaModel).subscribe({
        next: res => {

          console.log("Time & Action updated")
          alert("Time & Action updated.")
          this.loadTNA();
          this.tnaForm.reset();
          // console.log("inside vendor update")
        },
        error: er => {
          console.log(er)
          alert("Data not updated")
        }
      })
    }
  }


}
