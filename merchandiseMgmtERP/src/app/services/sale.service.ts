import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdjustmentMaterail, Buyers, Department, LaborCost, MeasuremantAttachment, MeasuremntDetails, OrderDetails, OrderStatus, Purchase, PurchaseStatus, RawMaterial, RawMaterialCat, Size, Stock, StockAdjustment, Style, StyleAttachment, StyleCategories, StyleMaterialQty, Task, TimeAction, Trim, UOM, Vendors, Warehouse } from '../models/sale.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  baseUrl="http://localhost:3000/"
  constructor(private http:HttpClient ) { }

//------------------------------------------ Sale -------------------------------------------
  
  
  
  //Style Categories start
  getAllstyleCat(): Observable<StyleCategories[]> {
    return this.http.get<StyleCategories[]>(`${this.baseUrl}/style-categories`);
  }

  createstyleCat(scat: StyleCategories): Observable<StyleCategories> {
    return this.http.post<StyleCategories>(`${this.baseUrl}/style-categories`, scat)
  }

  updatestyleCat(id: number, scat: StyleCategories): Observable<StyleCategories> {
    return this.http.put<StyleCategories>(`${this.baseUrl}/style-categories/${id}`, scat);
  }

  deletestyleCat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/style-categories/${id}`);
  }
  //Style Categories end
  //Size start

  getAllSize(): Observable<Size[]> {
    return this.http.get<Size[]>(`${this.baseUrl}/size`);
  }

  createSize(size: Size): Observable<Size> {
    return this.http.post<Size>(`${this.baseUrl}/size`, size)
  }

  updateSize(id: number, size: Size): Observable<Size> {
    return this.http.put<Size>(`${this.baseUrl}/size/${id}`, size);
  }

  deleteSize(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/size/${id}`);
  }

  //Size end
  //Trim start

  getAllTrim(): Observable<Trim[]> {
    return this.http.get<Trim[]>(`${this.baseUrl}/trim`);
  }

  createTrim(trim: Trim): Observable<Trim> {
    return this.http.post<Trim>(`${this.baseUrl}/trim`, trim)
  }

  updateTrim(id: number, trim: Trim): Observable<Trim> {
    return this.http.put<Trim>(`${this.baseUrl}/trim/${id}`, trim);
  }

  deleteTrim(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/trim/${id}`);
  }

  //Raw Material Categories start
  getAllRawMaterialCat(): Observable<RawMaterialCat[]> {
    return this.http.get<RawMaterialCat[]>(`${this.baseUrl}/raw_material_cate`);
  }

  createRawMaterialCat(materialCate: RawMaterialCat): Observable<RawMaterialCat> {
    return this.http.post<RawMaterialCat>(`${this.baseUrl}/raw_material_cate`, materialCate)
  }

  updateRawMaterialCat(id: number, materialCate: RawMaterialCat): Observable<RawMaterialCat> {
    return this.http.put<RawMaterialCat>(`${this.baseUrl}/raw_material_cate/${id}`, materialCate);
  }

  deleteRawMaterialCat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/raw_material_cate/${id}`);
  }
  
  
  
  //------------------------------------ Sale -----------------------------------------------------
  //------------------------------------ Sale dependent ------------------------------------------
  
  
  
  //Style start
  getAllStyle(): Observable<Style[]> {
    return this.http.get<Style[]>(`${this.baseUrl}/style`);
  }
  // find single style object for report
  getStyleById(id: number): Observable<Style> {
    return this.http.get<Style>(`${this.baseUrl}/style/${id}`);
  }

  createStyle(style: Style): Observable<Style> {
    return this.http.post<Style>(`${this.baseUrl}/style`, style)
  }

  updateStyle(id: number, style: Style): Observable<Style> {
    return this.http.put<Style>(`${this.baseUrl}/style/${id}`, style);
  }

  deleteStyle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/style/${id}`);
  }

  //Measurement Details 
  getAllMeasurementDetails(): Observable<MeasuremntDetails[]> {
    return this.http.get<MeasuremntDetails[]>(`${this.baseUrl}/measurement_details`);
  }

  createMeasurementDetails(details: MeasuremntDetails): Observable<MeasuremntDetails> {
    return this.http.post<MeasuremntDetails>(`${this.baseUrl}/measurement_details`, details);
  }

  updateMeasurementDetails(id: number, details: MeasuremntDetails): Observable<MeasuremntDetails> {
    return this.http.put<MeasuremntDetails>(`${this.baseUrl}/measurement_details/${id}`, details)
  }

  deleteMeasurementDetails(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/measurement_details/${id}`)
  }
  //Measurement Attachment
  getAllMeasurementAttachment(): Observable<MeasuremantAttachment[]> {
    return this.http.get<MeasuremantAttachment[]>(`${this.baseUrl}/measurement_attachment`);
  }

  createMeasurementAttachment(details: MeasuremantAttachment): Observable<MeasuremantAttachment> {
    return this.http.post<MeasuremantAttachment>(`${this.baseUrl}/measurement_attachment`, details);
  }

  updateMeasurementAttachment(id: number, details: MeasuremantAttachment): Observable<MeasuremantAttachment> {
    return this.http.put<MeasuremantAttachment>(`${this.baseUrl}/measurement_attachment/${id}`, details)
  }

  deleteMeasurementAttachment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/measurement_attachment/${id}`)
  }
  // api Raw Material /Attachment start
  getAllRawMaterial(): Observable<RawMaterial[]> {
    return this.http.get<RawMaterial[]>(`${this.baseUrl}/raw_material`);
  }

  createRawMaterial(raw: RawMaterial): Observable<RawMaterial> {
    return this.http.post<RawMaterial>(`${this.baseUrl}/raw_material`, raw);
  }

  updateRawMaterial(id: number, raw: RawMaterial): Observable<RawMaterial> {
    return this.http.put<RawMaterial>(`${this.baseUrl}/raw_material/${id}`, raw)
  }

  deleteRawMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/raw_material/${id}`)
  }
  // api Style Attachment start
  getAllStyleAttachment(): Observable<StyleAttachment[]> {
    return this.http.get<StyleAttachment[]>(`${this.baseUrl}/style_attachment`);
  }

  createStyleAttachment(raw: StyleAttachment): Observable<StyleAttachment> {
    return this.http.post<StyleAttachment>(`${this.baseUrl}/style_attachment`, raw);
  }

  updateStyleAttachment(id: number, raw: StyleAttachment): Observable<StyleAttachment> {
    return this.http.put<StyleAttachment>(`${this.baseUrl}/style_attachment/${id}`, raw)
  }

  deleteStyleAttachment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/style_attachment/${id}`)
  }

  

  // api Style Material Quantity start
  getAllStyleMaterialQty(): Observable<StyleMaterialQty[]> {
    return this.http.get<StyleMaterialQty[]>(`${this.baseUrl}/style_material_qty`);
  }

  createStyleMaterialQty(qty: StyleMaterialQty): Observable<StyleMaterialQty> {
    return this.http.post<StyleMaterialQty>(`${this.baseUrl}/style_material_qty`, qty);
  }

  updateStyleMaterialQty(id: number, qty: StyleMaterialQty): Observable<StyleMaterialQty> {
    return this.http.put<StyleMaterialQty>(`${this.baseUrl}/style_material_qty/${id}`, qty)
  }

  deleteStyleMaterialQty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/style_material_qty/${id}`)
  }

  
  
  //---------------------------------------- Inventory Table-----------------------------------------
  
  
  
  // api Warehouse start
  getAllWarehouse(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(`${this.baseUrl}/warehouse`);
  }

  createWarehouse(warehouse: Warehouse): Observable<Warehouse> {
    return this.http.post<Warehouse>(`${this.baseUrl}/warehouse`, warehouse);
  }

  updateWarehouse(id: number, warehouse: Warehouse): Observable<Warehouse> {
    return this.http.put<Warehouse>(`${this.baseUrl}/warehouse/${id}`, warehouse)
  }

  deleteWarehouse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/warehouse/${id}`)
  }

  // api Purchase Status start
  getAllPurchaseStatus(): Observable<PurchaseStatus[]> {
    return this.http.get<PurchaseStatus[]>(`${this.baseUrl}/purchase_status`);
  }
  

  createPurchaseStatus(status: PurchaseStatus): Observable<PurchaseStatus> {
    return this.http.post<PurchaseStatus>(`${this.baseUrl}/purchase_status`, status);
  }

  updatePurchaseStatus(id: number, status: PurchaseStatus): Observable<PurchaseStatus> {
    return this.http.put<PurchaseStatus>(`${this.baseUrl}/purchase_status/${id}`, status)
  }

  deletePurchaseStatus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/purchase_status/${id}`)
  }

  // api Stock Adjustment start

  getAllStockAdjustment(): Observable<StockAdjustment[]> {
    return this.http.get<StockAdjustment[]>(`${this.baseUrl}/stock_adjustment`);
  }

  createStockAdjustment(stockAdjust: StockAdjustment): Observable<StockAdjustment> {
    return this.http.post<StockAdjustment>(`${this.baseUrl}/stock_adjustment`, stockAdjust);
  }
  
  updateStockAdjustment(id: number, stockAdjust: StockAdjustment): Observable<StockAdjustment> {
    return this.http.put<StockAdjustment>(`${this.baseUrl}/stock_adjustment/${id}`, stockAdjust)
  }

  deleteStockAdjustment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/stock_adjustment/${id}`)
  }

  // api Adjustment Material start

  getAllAdjustmentMaterial(): Observable<AdjustmentMaterail[]> {
    return this.http.get<AdjustmentMaterail[]>(`${this.baseUrl}/adjustment_material`);
  }

  createAdjustmentMaterial(adjust: AdjustmentMaterail): Observable<AdjustmentMaterail> {
    return this.http.post<AdjustmentMaterail>(`${this.baseUrl}/adjustment_material`, adjust);
  }

  updateAdjustmentMaterial(id: number, adjust: AdjustmentMaterail): Observable<AdjustmentMaterail> {
    return this.http.put<AdjustmentMaterail>(`${this.baseUrl}/adjustment_material/${id}`, adjust)
  }

  deleteAdjustmentMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/adjustment_material/${id}`)
  }
  // api Purchase start

  getAllPurchase(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.baseUrl}/purchase`);
  }

  getPurchaseById(id: number): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.baseUrl}/purchase/${id}`);
  }

  createPurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(`${this.baseUrl}/purchase`, purchase);
  }

  updatePurchase(id: number, purchase: Purchase): Observable<Purchase> {
    return this.http.put<Purchase>(`${this.baseUrl}/purchase/${id}`, purchase)
  }

  deletePurchase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/purchase/${id}`)
  }
  // api Stock start
  getAllStock(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.baseUrl}/stock`);
  }
  
  
  //-------------------------------------- Other ---------------------------------------------------
  
  
  
  // api Vendors start
  getAllVendors(): Observable<Vendors[]> {
    return this.http.get<Vendors[]>(`${this.baseUrl}/vendors`);
  }

  createVendors(vendor: Vendors): Observable<Vendors> {
    return this.http.post<Vendors>(`${this.baseUrl}/vendors`, vendor);
  }

  updateVendors(id: number, vendor: Vendors): Observable<Vendors> {
    return this.http.put<Vendors>(`${this.baseUrl}/vendors/${id}`, vendor)
  }

  deleteVendors(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/vendors/${id}`)
  }
  // api Vendors end
  
  // api Unit of Measurement start

  getAllUOM(): Observable<UOM[]> {
    return this.http.get<UOM[]>(`${this.baseUrl}/uom`);
  }

  createUOM(uom: UOM): Observable<UOM> {
    return this.http.post<UOM>(`${this.baseUrl}/uom`, uom);
  }

  updateUOM(id: number, uom: UOM): Observable<UOM> {
    return this.http.put<UOM>(`${this.baseUrl}/uom/${id}`, uom)
  }

  deleteUOM(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/uom/${id}`)
  }

  // api Unit of Measurement end
  
  
  
  //---------------------------------------- BOM Table----------------------------------------------
  
  
  
  // api Department start

  getAllDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/department`);
  }

  createDepartment(dept: Department): Observable<Department> {
    return this.http.post<Department>(`${this.baseUrl}/department`, dept);
  }

  updateDepartment(id: number, dept: Department): Observable<Department> {
    return this.http.put<Department>(`${this.baseUrl}/department/${id}`, dept)
  }

  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/department/${id}`)
  }

  // api Department end

  // api Labor Cost start
  getAllLaborCost(): Observable<LaborCost[]> {
    return this.http.get<LaborCost[]>(`${this.baseUrl}/labor_cost`);
  }

  createLaborCost(cost: LaborCost): Observable<LaborCost> {
    return this.http.post<LaborCost>(`${this.baseUrl}/labor_cost`, cost);
  }

  updateLaborCost(id: number, cost: LaborCost): Observable<LaborCost> {
    return this.http.put<LaborCost>(`${this.baseUrl}/labor_cost/${id}`, cost)
  }

  deleteLaborCost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/labor_cost/${id}`)
  }
  // api Labor Cost end
  
  
  
  //---------------------------------------- Buyers Table--------------------------------------------



  // api Buyers start
  getAllBuyers(): Observable<Buyers[]> {
    return this.http.get<Buyers[]>(`${this.baseUrl}/buyers`);
  }

  createBuyers(buyer: Buyers): Observable<Buyers> {
    return this.http.post<Buyers>(`${this.baseUrl}/buyers`, buyer);
  }

  updateBuyers(id: number, buyer: Buyers): Observable<Buyers> {
    return this.http.put<Buyers>(`${this.baseUrl}/buyers/${id}`, buyer)
  }

  deleteBuyers(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/buyers/${id}`)
  }
  // api TNA start
  getAllTNA(): Observable<TimeAction[]> {
    return this.http.get<TimeAction[]>(`${this.baseUrl}/time_action`);
  }

  createTNA(tna: TimeAction): Observable<TimeAction> {
    return this.http.post<TimeAction>(`${this.baseUrl}/time_action`, tna);
  }

  updateTNA(id: number, tna: TimeAction): Observable<TimeAction> {
    return this.http.put<TimeAction>(`${this.baseUrl}/time_action/${id}`, tna)
  }

  deleteTNA(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/time_action/${id}`)
  }
  // api Task start

  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/task`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/task`, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/task/${id}`, task)
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/task/${id}`)
  }
  
  // api Orders Status start
  getAllOrdersStatus(): Observable<OrderStatus[]> {
    return this.http.get<OrderStatus[]>(`${this.baseUrl}/order_status`);
  }

  createOrdersStatus(orderStatus: OrderStatus): Observable<OrderStatus> {
    return this.http.post<OrderStatus>(`${this.baseUrl}/order_status`, orderStatus);
  }

  updateOrdersStatus(id: number, orderStatus: OrderStatus): Observable<OrderStatus> {
    return this.http.put<OrderStatus>(`${this.baseUrl}/order_status/${id}`, orderStatus)
  }

  deleteOrdersStatus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/order_status/${id}`)
  }
  // api Orders start

  getAllOrdersDetails(): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>(`${this.baseUrl}/orders`);
  }
// get order details by id
  getOrderDetailsById(id: number): Observable<OrderDetails> {
    return this.http.get<OrderDetails>(`${this.baseUrl}/orders/${id}`);
  }

  createOrdersDetails(order: OrderDetails): Observable<OrderDetails> {
    return this.http.post<OrderDetails>(`${this.baseUrl}/orders`, order);
  }

  updateOrdersDetails(id: number, order: OrderDetails): Observable<OrderDetails> {
    return this.http.put<OrderDetails>(`${this.baseUrl}/orders/${id}`, order)
  }

  deleteOrdersDetails(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/orders/${id}`)
  }

  
  //---------------------------------------- Report Table-------------------------------------------
  
  // api Time Action start
  getTimeActionByOrderId(id: number): Observable<TimeAction[]> {
    return this.http.get<TimeAction[]>(`${this.baseUrl}/time_action_report/${id}`);
  }

  // api BOM start
  getLaborCostByStyleId(id: number): Observable<LaborCost[]> {
    return this.http.get<LaborCost[]>(`${this.baseUrl}/bom_cost/${id}`);
  }
  getstyleMatByStyleId(id: number,sizeid:number): Observable<StyleMaterialQty[]> {
    return this.http.get<StyleMaterialQty[]>(`${this.baseUrl}/bom_size/${id}/${sizeid}`);
  }
  getAttachmentByStyleId(id: number): Observable<StyleAttachment[]> {
    return this.http.get<StyleAttachment[]>(`${this.baseUrl}/bom_attachment/${id}`);
  }

  // api TechPack start
  getrawMaterialByStyleId(id: number): Observable<RawMaterial[]> {
    return this.http.get<RawMaterial[]>(`${this.baseUrl}/techpage_mat/${id}`);
  }
  getMeasurementByStyleId(id: number): Observable<MeasuremntDetails[]> {
    return this.http.get<MeasuremntDetails[]>(`${this.baseUrl}/techpage_measurement/${id}`);
  }
  getSketchByStyleId(id: number): Observable<MeasuremantAttachment[]> {
    return this.http.get<MeasuremantAttachment[]>(`${this.baseUrl}/techpage_attachment/${id}`);
  }

  //---------------------------------------- Dashboard-------------------------------------------
  //DashBoard Data
  getOrdercount(): Observable<String> {
    return this.http.get<String>(`${this.baseUrl}/dash_order_count`);
  }
  //Transaction Order total amount
  getOrderTotal(): Observable<String> {
    return this.http.get<String>(`${this.baseUrl}/dash_order_total`);
  }
  //Transaction Purchase total amount
  getPurchaseTotal(): Observable<String> {
    return this.http.get<String>(`${this.baseUrl}/dash_purchase_total`);
  }
  //Transaction Revenue percentage
  getRevenue(): Observable<String> {
    return this.http.get<String>(`${this.baseUrl}/dash_revenue`);
  }
  
}
