import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'merchandiseMgmtERP';

  constructor(protected authService: AuthService){

  }

  ngOnInit(): void {
     
  }
 
}

