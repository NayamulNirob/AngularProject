import { Component, OnInit } from '@angular/core';
import { Task } from '../../../model/sale.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{

  task: Task[] = []
  taskForm!: FormGroup
  taskModel: Task = new Task();
  title: string = "Task list";
  title2: string = "Task Entry Form";

  menuType: boolean = true;
  //font awesome icon list
  fatrash = faTrash;
  editicon = faPenToSquare
  constructor(
    private service: SaleService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.initTaskForm()
    this.loadTask()
  }

  initTaskForm() {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required]
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

  //delete a Task
  deleteTask(taskId: number) {
    this.service.deleteTask(taskId).subscribe({
      next: res => {
        console.log("Task deleted")
        alert("Task deleted.")
        this.loadTask();

      },
      error: er => {
        console.log(er)
        alert("Data not deleted")
      }
    })
  }

  // create new Task
  onSubmit() {
    if (this.taskForm.valid) {

      const taskData: Task = this.taskForm.value;
      this.service.createTask(taskData).subscribe({
        next: res => {
          console.log("Task saved", res)
          alert("Task saved.")
          this.loadTask();
          this.taskForm.reset();
        },
        error: er => {
          console.log(er)
          alert("Data not saved")
        }
      })
    }
  }

  // set data on form to update
  onEditById(taskRow: any) {
    this.menuType = false;
    this.taskModel.id = taskRow.id;
    this.taskForm.controls['name'].setValue(taskRow.name)
  }

  //update Task data
  editTask() {
    if (this.taskForm.valid) {

      this.taskModel.name = this.taskForm.value.name

      this.service.updateTask(this.taskModel.id, this.taskModel).subscribe({
        next: res => {

          console.log("Task updated")
          alert("Task updated.")
          this.loadTask();
          this.taskForm.reset();
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
