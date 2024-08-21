import { Component, OnInit } from '@angular/core';
import { Buyers, OrderDetails, OrderStatus, Style } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faSearchPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit{

  order:OrderDetails[]=[]
  buyer:Buyers[]=[]
  status: OrderStatus[] = []
  style:Style[]=[]
  orderForm!:FormGroup
  orderModel:OrderDetails=new OrderDetails();
  title:string="Order Details List";
  title2:string="Order Details Entry Form";
  menuType: boolean=true;
  //font awesome icon list
  fatrash=faTrash;
  editicon=faPenToSquare
  fasearch=faSearchPlus
  //calculation
  
  // subTotal?:number=0;
  // vat?:number=0;
 
  // paid?:number=0;
  // due?:number=0;
  // total?:number=0;
  
  constructor(
    private service:SaleService,
    private formBuilder:FormBuilder,
    private router:Router
  ){}
  ngOnInit(): void {
    this.initOrdersForm()
    this.loadOrder()
    this.loadBuyers()
    this.loadOrderStatus()
    this.loadstyle()
  }

  initOrdersForm() {
    this.orderForm = this.formBuilder.group({
      oderDate: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      shippingAddress: ['', Validators.required],
      totalAmount: ['', Validators.required],
      paid: ['', Validators.required],
      samount: ['', Validators.required],
      mamount: ['', Validators.required],
      lamount: ['', Validators.required],
      orStatusId: ['', Validators.required],
      buyersId: ['', Validators.required],
      styleId: ['', Validators.required],

      smallPrice: [''],
      mediumPrice: [''],
      largePrice: [''],
      subTotal: [''],
      vat: [''],
      due: ['']

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

  //all buyers list
  private loadBuyers() {
    this.service.getAllBuyers().subscribe({
      next: res => {
        this.buyer = res;
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

  //delete a Order
  deleteOrder(orderId: number) {
    this.service.deleteOrdersDetails(orderId).subscribe({
      next: res => {
        console.log("Orders Details deleted", res)
        alert("Orders Details deleted.")
        this.loadOrder();

      },
      error: er => {
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new order
  onSubmit() {
    if (this.orderForm.valid) {

      const orderData: OrderDetails = this.orderForm.value;
      this.service.createOrdersDetails(orderData).subscribe({
        next: res => {
          console.log("Orders Details saved", res)
          alert("Orders Details saved.")
          this.loadOrder();
          this.orderForm.reset();
        },
        error: er => {
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  //OrderDetails By Id
  private findByOrderDetails(id:number){
    this.service.getOrderDetailsById(id).subscribe({
      next:res=>{
        this.orderForm.patchValue(res);
        this.orderForm.controls['styleId'].patchValue(res.styleId?.code);
        this.orderForm.controls['buyersId'].patchValue(res.buyersId?.organization);
        this.orderForm.controls['orStatusId'].patchValue(res.orStatusId?.name);
        
        
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  // set data on form to update
  onEditById(orderRow: any) {
    this.menuType = false;
    this.orderModel.id = orderRow.id;
    this.findByOrderDetails(orderRow.id)
    // this.orderForm.controls['oderDate'].setValue(orderRow.oderDate)
    // this.orderForm.controls['deliveryDate'].setValue(orderRow.deliveryDate)
    // this.orderForm.controls['shippingAddress'].setValue(orderRow.shippingAddress)
    // this.orderForm.controls['samount'].setValue(orderRow.samount)
    // this.orderForm.controls['lamount'].setValue(orderRow.lamount)
    // this.orderForm.controls['mamount'].setValue(orderRow.mamount)
    // this.orderForm.controls['orStatusId'].setValue(orderRow.orStatusId.name)
    // this.orderForm.controls['buyersId'].setValue(orderRow.buyersId?.organization)
    // this.orderForm.controls['styleId'].setValue(orderRow.styleId?.code)
    // this.orderForm.controls['totalAmount'].setValue(orderRow.totalAmount)
    // this.orderForm.controls['paid'].setValue(orderRow.paid)
    
  }

  //update Orders Details data
  editOrdersDetails() {
    if (this.orderForm.valid) {

      this.orderModel.oderDate = this.orderForm.value.oderDate
      this.orderModel.deliveryDate = this.orderForm.value.deliveryDate
      this.orderModel.shippingAddress = this.orderForm.value.shippingAddress
      this.orderModel.samount = this.orderForm.value.samount
      this.orderModel.lamount = this.orderForm.value.lamount
      this.orderModel.mamount = this.orderForm.value.mamount
      this.orderModel.orStatusId = this.orderForm.value.orStatusId
      this.orderModel.buyersId = this.orderForm.value.buyersId
      this.orderModel.styleId = this.orderForm.value.styleId
      this.orderModel.totalAmount = this.orderForm.value.totalAmount
      this.orderModel.paid = this.orderForm.value.paid

      this.service.updateOrdersDetails(this.orderModel.id, this.orderModel).subscribe({
        next: res => {

          console.log("Orders Details updated", res)
          alert("Orders Details updated.")
          this.loadOrder();
          this.orderForm.reset();
          // console.log("inside vendor update")
        },
        error: er => {
          console.log(er)
          alert("Data not updated")
        }
      })
    }
  }

  emptybox(){
    let reset:number=0;
    this.orderForm.controls['samount'].setValue(reset);
    this.orderForm.controls['mamount'].setValue(reset);
    this.orderForm.controls['lamount'].setValue(reset);
    this.orderForm.controls['smallPrice'].setValue(reset);
    this.orderForm.controls['mediumPrice'].setValue(reset);
    this.orderForm.controls['largePrice'].setValue(reset);
    this.orderForm.controls['subTotal'].setValue(reset);
    this.orderForm.controls['vat'].setValue(reset);
    this.orderForm.controls['paid'].setValue(reset);
    this.orderForm.controls['due'].setValue(reset);
    this.orderForm.controls['totalAmount'].setValue(reset);
    
  }
  totalbox(){
    // this.subTotal=parseFloat(this.smallQuantity)+parseFloat(this.largeQuantity)+parseFloat(this.mediumQuantity);
    let smallQty:number=this.orderForm.value.samount;
    let mediumQty:number=this.orderForm.value.mamount;
    let largeQty:number=this.orderForm.value.lamount;
    let smallPrice:number=this.orderForm.value.smallPrice;
    let midPrice:number=this.orderForm.value.mediumPrice;
    let largePrice:number=this.orderForm.value.largePrice;
    let result:number=(smallQty*smallPrice+mediumQty*midPrice+largeQty*largePrice)
    this.orderForm.controls['subTotal'].setValue(result);
    console.log(`small Quantity ${smallQty} midQty ${mediumQty} larQty${largeQty}
    smaprice ${smallPrice} midPrice ${midPrice} largePrice ${largePrice}`);
    console.log(`Total ${result}`)
  }
  onChange(event: Event) {
    // Get the new input value
    const newValue = (event.target as HTMLInputElement).value;
    // Perform actions based on the new value
    console.log('Input value changed:', newValue);
  }

  getValue():number{
    let total:number=0;
    let sub:number=this.orderForm.value.subTotal;
    let vat:number=this.orderForm.value.vat;
    if(vat != null){
    total=sub+(sub * vat)/100;
    this.orderForm.controls['totalAmount'].setValue(total);
    }else{
    total=sub+(sub * 0)/100;
    this.orderForm.controls['totalAmount'].setValue(total);
    }
    return total;
    
  }
  getDue():number{
    let total = this.orderForm.value.totalAmount;
    let paid = this.orderForm.value.paid
    let due = total - paid;
    this.orderForm.controls['due'].setValue(due);
    return due;
  }

  findTimeActionById(id:number){
    this.router.navigate(['/techpack/time_action_page',id])
  }

  findOrdersDetailsById(id:number){
    this.router.navigate(['/techpack/order_receipt',id])
  }

}
