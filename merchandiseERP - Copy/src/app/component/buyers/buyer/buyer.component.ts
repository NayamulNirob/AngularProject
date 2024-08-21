import { Component, OnInit } from '@angular/core';
import { Buyers } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrl: './buyer.component.css'
})
export class BuyerComponent implements OnInit {

  buyer: Buyers[] = []
  buyerForm!: FormGroup
  buyerModel: Buyers = new Buyers();
  title: string = "Buyers list";
  title2: string = "Buyers Entry Form";

  menuType: boolean = true;
  //font awesome icon list
  fatrash = faTrash;
  editicon = faPenToSquare
  constructor(
    private service: SaleService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.initBuyersForm()
    this.loadBuyers()
  }
  initBuyersForm() {
    this.buyerForm = this.formBuilder.group({
      organization: ['', Validators.required],
      contactPerson: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required]

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

  //delete a buyer
  deleteBuyer(buyerId: number) {
    this.service.deleteBuyers(buyerId).subscribe({
      next: res => {
        console.log("Buyer deleted", res)
        alert("Buyer deleted.")
        this.loadBuyers();

      },
      error: er => {
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new buyer
  onSubmit() {
    if (this.buyerForm.valid) {

      const buyerData: Buyers = this.buyerForm.value;
      this.service.createBuyers(buyerData).subscribe({
        next: res => {
          console.log("Buyer saved", res)
          alert("Buyer saved.")
          this.loadBuyers();
          this.buyerForm.reset();
        },
        error: er => {
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  // set data on form to update
  onEditById(buyerRow: any) {
    this.menuType = false;
    this.buyerModel.id = buyerRow.id;
    this.buyerForm.controls['organization'].setValue(buyerRow.organization)
    this.buyerForm.controls['contactPerson'].setValue(buyerRow.contactPerson)
    this.buyerForm.controls['phone'].setValue(buyerRow.phone)
    this.buyerForm.controls['email'].setValue(buyerRow.email)
    this.buyerForm.controls['address'].setValue(buyerRow.address)
    this.buyerForm.controls['country'].setValue(buyerRow.country)
  }

  //update buyer data
  editBuyers() {
    if (this.buyerForm.valid) {

      this.buyerModel.organization = this.buyerForm.value.organization
      this.buyerModel.contactPerson = this.buyerForm.value.contactPerson
      this.buyerModel.phone = this.buyerForm.value.phone
      this.buyerModel.email = this.buyerForm.value.email
      this.buyerModel.address = this.buyerForm.value.address
      this.buyerModel.country = this.buyerForm.value.country

      this.service.updateBuyers(this.buyerModel.id, this.buyerModel).subscribe({
        next: res => {

          console.log("Buyer updated", res)
          alert("Buyer updated.")
          this.loadBuyers();
          this.buyerForm.reset();
          console.log("inside vendor update")
        },
        error: er => {
          console.log(er)
          alert("Data not updated")
        }
      })
    }
  }

}
