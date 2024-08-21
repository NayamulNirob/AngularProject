import { Component, OnInit } from '@angular/core';
import { Department, LaborCost, Style } from '../../../model/sale.model';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-labor-cost',
  templateUrl: './labor-cost.component.html',
  styleUrl: './labor-cost.component.css'
})
export class LaborCostComponent implements OnInit{

  cost:LaborCost[]=[]
  style:Style[]=[]
  dept:Department[]=[]
  costForm !:FormGroup
  costModel:LaborCost=new LaborCost();
  title:string="Labor Cost List";
  title2:string="Labor Cost Entry Form";
  menuType: boolean=true;
  //font awesome icon list
  fatrash=faTrash;
  editicon=faPenToSquare
  constructor(
    private service:SaleService,
    private formBuilder:FormBuilder
  ){}
  ngOnInit(): void {
    this.initLaborcostForm()
    this.loadDept()
    this.loadStyle()
    this.loadLaborCost()
  }

  initLaborcostForm(){
    this.costForm=this.formBuilder.group({
      unitCost:['',Validators.required],
      hour:['',Validators.required],
      styleId:['',Validators.required],
      departmentId:['',Validators.required]
    })
  }
  //all department list
  private loadDept(){
    this.service.getAllDepartment().subscribe({
      next:res=>{
        this.dept=res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }
  //all Style list
  private loadStyle(){
    this.service.getAllStyle().subscribe({
      next:res=>{
        this.style=res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }
  //all Labor Cost list
  private loadLaborCost(){
    this.service.getAllLaborCost().subscribe({
      next:res=>{
        this.cost=res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  //delete a Labor Cost
  deleteLaborCost(costId:number){
    this.service.deleteLaborCost(costId).subscribe({
      next:res=>{
        console.log("Labor Cost deleted",res)
        alert("Labor Cost deleted.")
        this.loadDept();
          
      },
      error:er=>{
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new Labor Cost
  onSubmit(){
    if(this.costForm.valid){
      const costData:LaborCost =this.costForm.value;
      this.service.createLaborCost(costData).subscribe({
        next:res=>{
          console.log("Labor Cost saved",res)
          alert("Labor Cost saved.")
          this.loadLaborCost();
          this.costForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  // set data on form to update
  onEditById(costRow:any){
    this.menuType=false;
    this.costModel.id=costRow.id;
    this.costForm.controls['unitCost'].setValue(costRow.unitCost)
    this.costForm.controls['hour'].setValue(costRow.hour)
    this.costForm.controls['styleId'].setValue(costRow.styleId.code)
    this.costForm.controls['departmentId'].setValue(costRow.departmentId.name)
    
  }

    //update size name
 editLaborCost(){
  if(this.costForm.valid){
    this.costModel.unitCost=this.costForm.value.unitCost
    this.costModel.hour=this.costForm.value.hour
    this.costModel.styleId=this.costForm.value.styleId
    this.costModel.departmentId=this.costForm.value.departmentId
    this.service.updateLaborCost(this.costModel.id,this.costModel).subscribe({
      next:res=>{
        console.log("Labor Cost updated",res)
        alert("Labor Cost updated.")
        this.loadLaborCost();
        this.costForm.reset();
      },
      error:er=>{
        console.log(er)
        alert("Data not updated")
      }
    })
  }
}

}
