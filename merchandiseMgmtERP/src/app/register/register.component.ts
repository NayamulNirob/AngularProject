import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../model/sale.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{

  // registrationForm: FormGroup;
  // passwordStrength: number = 0;
  // passwordMismatch: boolean = false;


  // constructor(private fb: FormBuilder) {
  //   this.registrationForm = this.fb.group({
  //     username: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     confirmPassword: ['', Validators.required],
  //     rememberMe: [false],
  //   });
  // }

  // checkPasswordStrength() {
  //   const password = this.registrationForm.get('password')?.value;
  //   this.passwordStrength = 0;

  //   if (password.length >= 6) this.passwordStrength += 20;
  //   if (/[A-Z]/.test(password)) this.passwordStrength += 20;
  //   if (/[a-z]/.test(password)) this.passwordStrength += 20;
  //   if (/[0-9]/.test(password)) this.passwordStrength += 20;
  //   if (/[!@#$%^&*]/.test(password)) this.passwordStrength += 20;
  // }

  // checkPasswordMatch() {
  //   const password = this.registrationForm.get('password')?.value;
  //   const confirmPassword = this.registrationForm.get('confirmPassword')?.value;
  //   this.passwordMismatch = password !== confirmPassword;
  // }

  // onSubmit() {
  //   if (this.registrationForm.valid && !this.passwordMismatch) {
  //     const registrationData = {
  //       username: this.registrationForm.value.username,
  //       email: this.registrationForm.value.email,
  //       password: this.registrationForm.value.password,
  //       rememberMe: this.registrationForm.value.rememberMe,
  //     };
  //     console.log('Registration Data:', registrationData);
  //     // Here you can send registrationData to your backend API as JSON  
  //   }
  // }

  regFrom!:FormGroup;

  constructor(
    private authService:AuthService,
    private router:Router,
    private fromBulider:FormBuilder
  ){
    this.regFrom=this.fromBulider.group({
     name:[''],
      email:[''],
      password:[''],
      photo:['']
      
    })
  }

  onSubmit():void{

    if(this.regFrom.valid){
      const user:UserModel=this.regFrom.value;
      this.authService.regitration(user).subscribe({
        next:(res)=>{
          console.log('user registration Successfully:',res);
          this.authService.storeToken(res.token);
          this.router.navigate(['/login']);

        },
        error:(error)=>{
          console.error('Error registering user:',error);
        }

      });
    }
    else{
      alert("Complete mandatory Filed");
    }

}

}

