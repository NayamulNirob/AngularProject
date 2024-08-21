import { Component, OnInit } from '@angular/core';
import { Department } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit{
  
  dept:Department[]=[]
  deptForm !:FormGroup
  deptModel:Department=new Department();
  title:string="Department list";
  title2:string="Department Entry Form";
  menuType: boolean=true;
  //font awesome icon list
  fatrash=faTrash;
  editicon=faPenToSquare
  constructor(
    private service:SaleService,
    private formBuilder:FormBuilder
  ){}
  ngOnInit(): void {
    this.initDeptForm()
    this.loadDept()
  }

  initDeptForm(){
    this.deptForm=this.formBuilder.group({
      name:['',Validators.required]
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

  //delete a Department
  deleteDept(deptId:number){
    this.service.deleteDepartment(deptId).subscribe({
      next:res=>{
        console.log("Department deleted",res)
        alert("Department deleted.")
        this.loadDept();
          
      },
      error:er=>{
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new Department
  onSubmit(){
    if(this.deptForm.valid){
      const deptData:Department =this.deptForm.value;
      this.service.createDepartment(deptData).subscribe({
        next:res=>{
          console.log("Department saved",res)
          alert("Department saved.")
          this.loadDept();
          this.deptForm.reset();
        },
        error:er=>{
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  // set data on form to update
  onEditById(deptRow:any){
    this.menuType=false;
    this.deptModel.id=deptRow.id;
    this.deptForm.controls['name'].setValue(deptRow.name)
  }

    //update size name
 editDept(){
  if(this.deptForm.valid){
    this.deptModel.name=this.deptForm.value.name
    this.service.updateDepartment(this.deptModel.id,this.deptModel).subscribe({
      next:res=>{
        console.log("Department updated",res)
        alert("Department updated.")
        this.loadDept();
        this.deptForm.reset();
      },
      error:er=>{
        console.log(er)
        alert("Data not updated")
      }
    })
  }
}

}
