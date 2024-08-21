import { Component, OnInit } from '@angular/core';
import { StockAdjustment } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-stock-adjustment',
  templateUrl: './stock-adjustment.component.html',
  styleUrl: './stock-adjustment.component.css'
})
export class StockAdjustmentComponent implements OnInit{

  stockAdjust: StockAdjustment[] = []
  stockAdjustForm!: FormGroup
  stockAdjustModel: StockAdjustment = new StockAdjustment();
  title: string = "Stock Adjustment list";
  title2: string = "Stock Adjustment Entry Form";

  menuType: boolean = true;
  //font awesome icon list
  fatrash = faTrash;
  editicon = faPenToSquare
  constructor(
    private service: SaleService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.initStockAdjustmentForm()
    this.loadStockAdjustment();
  }

  initStockAdjustmentForm() {
    this.stockAdjustForm = this.formBuilder.group({
      name: ['', Validators.required],
      factor: ['', Validators.required]
    })
  }

  //all Stock Adjustment list
  private loadStockAdjustment() {
    this.service.getAllStockAdjustment().subscribe({
      next: res => {
        this.stockAdjust = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  //delete a Stock Adjustment
  deleteStockAdjustment(stockAdjustId: number) {
    this.service.deleteStockAdjustment(stockAdjustId).subscribe({
      next: res => {
        console.log("Stock Adjustment deleted")
        alert("Stock Adjustment deleted.")
        this.loadStockAdjustment();

      },
      error: er => {
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new vendorWarehouse
  onSubmit() {
    if (this.stockAdjustForm.valid) {

      const stockAdjustData: StockAdjustment = this.stockAdjustForm.value;
      this.service.createStockAdjustment(stockAdjustData).subscribe({
        next: res => {
          console.log("Stock Adjustment saved", res)
          alert("Stock Adjustment saved.")
          this.loadStockAdjustment();
          this.stockAdjustForm.reset();
        },
        error: er => {
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  // set data on form to update
  onEditById(stockAdjustRow: any) {
    this.menuType = false;
    this.stockAdjustModel.id = stockAdjustRow.id;
    this.stockAdjustForm.controls['name'].setValue(stockAdjustRow.name)
    this.stockAdjustForm.controls['factor'].setValue(stockAdjustRow.factor)
  }

   //update vendor data
   editStockAdjustment() {
    if (this.stockAdjustForm.valid) {

      this.stockAdjustModel.name = this.stockAdjustForm.value.name
      this.stockAdjustModel.factor = this.stockAdjustForm.value.factor

      this.service.updateStockAdjustment(this.stockAdjustModel.id, this.stockAdjustModel).subscribe({
        next: res => {

          console.log("Stock Adjustment updated")
          alert("Stock Adjustment updated.")
          this.loadStockAdjustment();
          this.stockAdjustForm.reset();
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
