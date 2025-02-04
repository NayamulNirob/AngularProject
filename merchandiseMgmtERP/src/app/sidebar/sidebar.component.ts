import { Component, OnInit } from '@angular/core';
import { UserprofileComponent } from '../userprofile/userprofile.component';
import { UserModel } from '../model/sale.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
 

  userRole: string | null = '';
  currentUser: UserModel | null = null;

constructor(private authService:AuthService) {
  
}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.userRole = user?.role || null;
    });
  }

}
