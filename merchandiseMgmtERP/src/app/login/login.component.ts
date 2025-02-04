import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 logInFrom!:FormGroup;

  constructor(
    private router:Router,
    private fromBuilder:FormBuilder,
    private authService:AuthService

  ){
    this.logInFrom=this.fromBuilder.group({
      email:[''],
      password:['']
    });
  }

  onSubmit():void{
    if(this.logInFrom.valid){
      const credentials=this.logInFrom.value;
      this.authService.login(credentials).subscribe({
        next:(res)=>{
          console.log("user log in successfully:",res);
          this.authService.storeToken(res.token);
          const role=this.authService.getUserRole();
          this.router.navigate(['/userProfile']);
        },
        error:(err)=>{
          console.error('Error Log In',err);
        }
      });
    }
  }
}
