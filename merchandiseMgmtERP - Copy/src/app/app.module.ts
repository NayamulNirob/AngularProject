import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BuyerComponent } from './component/buyers/buyer/buyer.component';
import { OrderDetailsComponent } from './component/buyers/order-details/order-details.component';
import { LoginFormComponent } from './component/login/login-form/login-form.component';


@NgModule({
  declarations: [
    AppComponent,
    BuyerComponent,
    OrderDetailsComponent,
    LoginFormComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
