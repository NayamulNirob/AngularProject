import { Component, OnInit } from '@angular/core';
import { PurchaseStatus } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-purchase-status',
  templateUrl: './purchase-status.component.html',
  styleUrl: './purchase-status.component.css'
})
export class PurchaseStatusComponent implements OnInit {

  status: PurchaseStatus[] = []
  statusForm!: FormGroup
  statusModel: PurchaseStatus = new PurchaseStatus();
  title: string = "Purchase Status list";
  title2: string = "Purchase Status Entry Form";

  menuType: boolean = true;
  //font awesome icon list
  fatrash = faTrash;
  editicon = faPenToSquare
  constructor(
    private service: SaleService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.initPurchaeStatusForm();
    this.loadPurchaseStatus()
  }

  initPurchaeStatusForm() {
    this.statusForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  //all Purchase Status list
  private loadPurchaseStatus() {
    this.service.getAllPurchaseStatus().subscribe({
      next: res => {
        this.status = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  //delete a Purchase Status
  deletePurchaseStatus(statusId: number) {
    this.service.deletePurchaseStatus(statusId).subscribe({
      next: res => {
        console.log("Purchase Status deleted", res)
        alert("Purchase Status deleted.")
        this.loadPurchaseStatus();

      },
      error: er => {
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new Purchase Status
  onSubmit() {
    if (this.statusForm.valid) {

      const statusData: PurchaseStatus = this.statusForm.value;
      this.service.createPurchaseStatus(statusData).subscribe({
        next: res => {
          console.log("Purchase Status saved", res)
          alert("Purchase Status saved.")
          this.loadPurchaseStatus();
          this.statusForm.reset();
        },
        error: er => {
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  // set data on form to update
  onEditById(statusRow: any) {
    this.menuType = false;
    this.statusModel.id = statusRow.id;
    this.statusForm.controls['name'].setValue(statusRow.name)
  }

  //update Purchase data
  editPurchaseStatus() {
    if (this.statusForm.valid) {

      this.statusModel.name = this.statusForm.value.name

      this.service.updatePurchaseStatus(this.statusModel.id, this.statusModel).subscribe({
        next: res => {

          console.log("Purchase Status updated")
          alert("Purchase Status updated.")
          this.loadPurchaseStatus();
          this.statusForm.reset();
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
