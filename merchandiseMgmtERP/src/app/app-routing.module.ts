import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProducmanagementComponent } from './businesscomponent/producmanagement/producmanagement.component';
import { InventoryManagementComponent } from './businesscomponent/inventorymanagement/inventorymanagement.component';
import { OrdermanagementComponent } from './businesscomponent/ordermanagement/ordermanagement.component';
import { SupplierManagementComponent } from './businesscomponent/suppliermanagement/suppliermanagement.component';
import { SalesManagementComponent } from './businesscomponent/salesmanagement/salesmanagement.component';
import { CustomerManagementComponent } from './businesscomponent/customermanagement/customermanagement.component';
import { ReportsAnalyticsComponent } from './businesscomponent/reports-and-analytics/reports-and-analytics.component';
import { UpdateproductmanagementComponent } from './businesscomponent/updateproductmanagement/updateproductmanagement.component';
import { AuthguardGuard } from './guard/authguard.guard';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { RoleGuard } from './guard/role.guard';


const routes: Routes = [
  {path:'dashbord',component:DashbordComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'product',component:ProducmanagementComponent,canActivate:[AuthguardGuard]},
  {path:'inventory',component:InventoryManagementComponent,canActivate:[AuthguardGuard]},
  {path:'orders',component:OrdermanagementComponent,canActivate:[AuthguardGuard]},
  {path:'supplier',component:SupplierManagementComponent,canActivate:[AuthguardGuard]},
  {path:'sales',component:SalesManagementComponent,canActivate:[AuthguardGuard]},
  {path:'customer',component:CustomerManagementComponent,canActivate:[AuthguardGuard]},
  {path:'reports',component:ReportsAnalyticsComponent,canActivate:[AuthguardGuard]},
  {path:'userProfile',component:UserprofileComponent,canActivate:[AuthguardGuard]},
  {path:'updateproduct/:id',component:UpdateproductmanagementComponent,canActivate:[AuthguardGuard]},
  {path:"**", redirectTo:'login' , pathMatch:'full'},
  {
    path:'userProfile',
    component:UserprofileComponent,
    canActivate:[AuthguardGuard,RoleGuard],
    data:{role:['Admin','user']}
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
