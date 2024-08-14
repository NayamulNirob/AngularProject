import { Component, OnInit } from '@angular/core';
import { Stock } from '../../../model/sale.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent implements OnInit{

  stock: Stock[] = []
  stockForm!: FormGroup
  stockModel: Stock = new Stock();
  title: string = "Stock list";
  title2: string = "Stock Entry Form";

  menuType: boolean = true;
  //font awesome icon list
  fatrash = faTrash;
  editicon = faPenToSquare
  constructor(
    private service: SaleService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.loadStock()
  }

  //all Stock  list
  private loadStock() {
    this.service.getAllStock().subscribe({
      next: res => {
        this.stock = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
