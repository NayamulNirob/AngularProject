import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { ControlWrapperComponent } from './control-wrapper/control-wrapper.component';
import { HomeComponent } from './home/home.component';
import { StyleCategoriesComponent } from './component/sale/style-categories/style-categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SizeComponent } from './component/sale/size/size.component';
import { TrimComponent } from './component/sale/trim/trim.component';
import { RawMaterialCategoriesComponent } from './component/sale/raw-material-categories/raw-material-categories.component';
import { StyleComponent } from './component/sale/style/style.component';
import { MeasurementDetailsComponent } from './component/sale/measurement-details/measurement-details.component';
import { PaginationComponent } from './component/sale/pagination/pagination.component';
import { VendorsComponent } from './component/other/vendors/vendors.component';
import { UomComponent } from './component/other/uom/uom.component';
import { DepartmentComponent } from './component/other/department/department.component';
import { LaborCostComponent } from './component/other/labor-cost/labor-cost.component';
import { WarehouseComponent } from './component/inventory/warehouse/warehouse.component';
import { PurchaseStatusComponent } from './component/inventory/purchase-status/purchase-status.component';
import { StockAdjustmentComponent } from './component/inventory/stock-adjustment/stock-adjustment.component';
import { OrderStatusComponent } from './component/inventory/order-status/order-status.component';
import { TaskComponent } from './component/inventory/task/task.component';
import { BuyerComponent } from './component/buyers/buyer/buyer.component';
import { OrderDetailsComponent } from './component/buyers/order-details/order-details.component';
import { RawMaterialComponent } from './component/sale/raw-material/raw-material.component';
import { MeasurementAttachmentComponent } from './component/sale/measurement-attachment/measurement-attachment.component';
import { StyleAttachmentComponent } from './component/sale/style-attachment/style-attachment.component';
import { StocksComponent } from './component/inventory/stocks/stocks.component';
import { StyleMaterialQtyComponent } from './component/sale/style-material-qty/style-material-qty.component';
import { AdjustmentMaterialComponent } from './component/inventory/adjustment-material/adjustment-material.component';
import { PurchaseComponent } from './component/inventory/purchase/purchase.component';
import { StyleBomComponent } from './component/reports/style-bom/style-bom.component';
import { BomMaterialComponent } from './component/reports/bom-material/bom-material.component';
import { TechpageComponent } from './component/reports/techpage/techpage.component';
import { TimeActionPageComponent } from './component/reports/time-action-page/time-action-page.component';
import { TnaComponent } from './component/buyers/tna/tna.component';
import { PurchaseReceiptComponent } from './component/inventory/purchase-receipt/purchase-receipt.component';
import { RegistrationFormComponent } from './component/login/registration-form/registration-form.component';
import { LoginFormComponent } from './component/login/login-form/login-form.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    ControlSidebarComponent,
    MainFooterComponent,
    ControlWrapperComponent,
    HomeComponent,
    StyleCategoriesComponent,
    SizeComponent,
    TrimComponent,
    RawMaterialCategoriesComponent,
    StyleComponent,
    MeasurementDetailsComponent,
    PaginationComponent,
    VendorsComponent,
    UomComponent,
    DepartmentComponent,
    LaborCostComponent,
    WarehouseComponent,
    PurchaseStatusComponent,
    StockAdjustmentComponent,
    OrderStatusComponent,
    TaskComponent,
    BuyerComponent,
    OrderDetailsComponent,
    RawMaterialComponent,
    MeasurementAttachmentComponent,
    StyleAttachmentComponent,
    StocksComponent,
    StyleMaterialQtyComponent,
    AdjustmentMaterialComponent,
    PurchaseComponent,
    StyleBomComponent,
    BomMaterialComponent,
    TechpageComponent,
    TimeActionPageComponent,
    TnaComponent,
    PurchaseReceiptComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    AppLayoutComponent,
    LoginLayoutComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule, FontAwesomeModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
