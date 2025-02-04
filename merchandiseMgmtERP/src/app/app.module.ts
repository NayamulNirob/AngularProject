import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProducmanagementComponent } from './businesscomponent/producmanagement/producmanagement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { InventoryManagementComponent } from './businesscomponent/inventorymanagement/inventorymanagement.component';
import { OrdermanagementComponent } from './businesscomponent/ordermanagement/ordermanagement.component';
import { SupplierManagementComponent } from './businesscomponent/suppliermanagement/suppliermanagement.component';
import { SalesManagementComponent } from './businesscomponent/salesmanagement/salesmanagement.component';
import { CustomerManagementComponent } from './businesscomponent/customermanagement/customermanagement.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { ReportsAnalyticsComponent } from './businesscomponent/reports-and-analytics/reports-and-analytics.component';
import { UpdateproductmanagementComponent } from './businesscomponent/updateproductmanagement/updateproductmanagement.component';
import { LogoutComponent } from './logout/logout.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { MultiLocationSupportComponent } from './businesscomponent/multi-location-support/multi-location-support.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashbordComponent,
    LoginComponent,
    RegisterComponent,
    ProducmanagementComponent,
    InventoryManagementComponent,
    OrdermanagementComponent,
    SupplierManagementComponent,
    SalesManagementComponent,
    CustomerManagementComponent,
    ReportsAnalyticsComponent,
    UpdateproductmanagementComponent,
    LogoutComponent,
    UserprofileComponent,
    MultiLocationSupportComponent
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,  
    ReactiveFormsModule

  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    ProductService,
    provideAnimationsAsync(),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
