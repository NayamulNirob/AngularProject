import { Component, OnInit } from '@angular/core';
import { RawMaterial, Size, Style, StyleMaterialQty } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-style-material-qty',
  templateUrl: './style-material-qty.component.html',
  styleUrl: './style-material-qty.component.css'
})
export class StyleMaterialQtyComponent implements OnInit {

  styleQty: StyleMaterialQty[] = []
  style: Style[] = []
  material: RawMaterial[] = []
  size: Size[] = []

  styleQtyForm!: FormGroup
  styleQtyModel: StyleMaterialQty = new StyleMaterialQty();
  title: string = "Style Material Qty list";
  title2: string = "Style Material Qty Entry Form";
  menuType: boolean = true;
  //font awesome icon list
  fatrash = faTrash;
  editicon = faPenToSquare
  constructor(
    private service: SaleService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initStyleQtyForm()
    this.loadstyle()
    this.loadstyleQty()
    this.loadmaterial()
    this.loadSize()
  }
  initStyleQtyForm() {
    this.styleQtyForm = this.formBuilder.group({
      quantity: ['', Validators.required],
      styleId: ['', Validators.required],
      rawMaterialId: ['', Validators.required],
      sizeId: ['', Validators.required]
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


  //all material list
  private loadmaterial() {
    this.service.getAllRawMaterial().subscribe({
      next: res => {
        this.material = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }


  //all size list
  private loadSize() {
    this.service.getAllSize().subscribe({
      next: res => {
        this.size = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  //all Style Material Qty list
  private loadstyleQty() {
    this.service.getAllStyleMaterialQty().subscribe({
      next: res => {
        this.styleQty = res
      },
      error: err => {
        console.log(err);
      }
    })
  }

  //get all StyleMaterial Qty end
  onSubmit() {
    if (this.styleQtyForm.valid) {
      const styleQtyData: StyleMaterialQty = this.styleQtyForm.value;
      this.service.createStyleMaterialQty(styleQtyData).subscribe({
        next: res => {
          console.log("Style Material Qty saved", res)
          alert("Style Material Qty saved.")
          this.loadstyleQty();
          this.styleQtyForm.reset();
        },
        error: er => {
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  //delete a Style Material Qty
  deleteStyleMaterialQty(qtyId: number) {
    this.service.deleteStyleMaterialQty(qtyId).subscribe({
      next: res => {
        console.log("Style Material Qty deleted", res)
        alert("Style Material Qty deleted.")
        this.loadstyleQty();

      },
      error: er => {
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  onEditById(qtyRow:any){
    this.menuType=false;
    this.styleQtyModel.id=qtyRow.id;
    this.styleQtyForm.controls['quantity'].setValue(qtyRow.quantity)
    this.styleQtyForm.controls['styleId'].setValue(qtyRow.styleId.code)
    this.styleQtyForm.controls['rawMaterialId'].setValue(qtyRow.rawMaterialId.name)
    this.styleQtyForm.controls['sizeId'].setValue(qtyRow.sizeId.name)
  }

  editStyleQty(){
    if(this.styleQtyForm.valid){
      this.styleQtyModel.quantity=this.styleQtyForm.value.quantity
      this.styleQtyModel.styleId=this.styleQtyForm.value.styleId
      this.styleQtyModel.rawMaterialId=this.styleQtyForm.value.rawMaterialId
      this.styleQtyModel.sizeId=this.styleQtyForm.value.sizeId
      this.service.updateStyleMaterialQty(this.styleQtyModel.id,this.styleQtyModel).subscribe({
        next:res=>{
          console.log("Style Material Qty updated",res)
          alert("Style Material Qty updated.")
          this.loadstyleQty();
          this.styleQtyForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not updated")
        }
      })
    }
  }


}
