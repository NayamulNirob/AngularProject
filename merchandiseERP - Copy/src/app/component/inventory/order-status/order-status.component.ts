import { Component, OnInit } from '@angular/core';
import { OrderStatus } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.css'
})
export class OrderStatusComponent implements OnInit {

  status: OrderStatus[] = []
  statusForm!: FormGroup
  statusModel: OrderStatus = new OrderStatus();
  title: string = "Order Status list";
  title2: string = "Order Status Entry Form";

  menuType: boolean = true;
  //font awesome icon list
  fatrash = faTrash;
  editicon = faPenToSquare
  constructor(
    private service: SaleService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initOrderStatusForm()
    this.loadOrderStatus();
  }

  initOrderStatusForm() {
    this.statusForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  //all Order Status list
  private loadOrderStatus() {
    this.service.getAllOrdersStatus().subscribe({
      next: res => {
        this.status = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  //delete a Purchase Status
  deleteOrderStatus(statusId: number) {
    this.service.deleteOrdersStatus(statusId).subscribe({
      next: res => {
        console.log("Order Status deleted")
        alert("Order Status deleted.")
        this.loadOrderStatus();

      },
      error: er => {
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new Order Status
  onSubmit() {
    if (this.statusForm.valid) {

      const statusData: OrderStatus = this.statusForm.value;
      this.service.createOrdersStatus(statusData).subscribe({
        next: res => {
          console.log("Order Status saved", res)
          alert("Order Status saved.")
          this.loadOrderStatus();
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

  //update Order Status data
  editOrderStatus() {
    if (this.statusForm.valid) {

      this.statusModel.name = this.statusForm.value.name

      this.service.updateOrdersStatus(this.statusModel.id, this.statusModel).subscribe({
        next: res => {

          console.log("Order Status updated")
          alert("Order Status updated.")
          this.loadOrderStatus();
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
