// supplier-management.component.ts  
import { Component, OnInit } from '@angular/core';  
import { Supplier } from '../../model/sale.model';
import { SupplierService } from '../../services/supplier.service';


@Component({  
  selector: 'app-supplier-management',  
  templateUrl: './suppliermanagement.component.html',  
  styleUrls: ['./suppliermanagement.component.css']  
})  
export class SupplierManagementComponent implements OnInit {  
  suppliers: Supplier[] = [];  
  filteredSuppliers: Supplier[] = [];  
  searchTerm: string = '';  
  sortBy: 'name' | 'contactPerson' | 'email' = 'name';  
  newSupplier: Supplier = new Supplier();  

  constructor(private supplierService: SupplierService
  ) {}  

  ngOnInit(): void {  
    this.supplierService.loadSuppliers().subscribe(data => {  
      this.suppliers = data;  
      this.filteredSuppliers = data; // Initialize filtered suppliers  
    });  
  }  

  addSupplier() {  
    this.newSupplier.id = this.suppliers.length + 1; // Simple ID generation  
    this.newSupplier.createdAt = new Date();  
    this.newSupplier.updatedAt = new Date();  

    this.supplierService.addSupplier(this.newSupplier).subscribe(() => {  
      this.updateFilteredSuppliers();  
      this.resetNewSupplier();  
    }); 
  }  


  

  // updateSupplier(supplierId: number, contactPerson: string, email: string, phone: string) {  
  //   this.supplierService.updateSupplier(supplierId, { contactPerson, email, phone });  
  //   this.updateFilteredSuppliers();  
  // }  

  // removeSupplier(supplierId: number) {  
  //   this.supplierService.removeSupplier(supplierId);  
  //   this.updateFilteredSuppliers();  
  // }  

  // updateSupplier(supplierId: number, contactPerson: string, email: string, phone: string) {  
  //   this.supplierService.updateSupplier(supplierId, { contactPerson, email, phone }).subscribe(() => {  
  //     this.updateFilteredSuppliers();  
  //   });  
  // }  

  // removeSupplier(supplierId: number) {  
  //   this.supplierService.removeSupplier(supplierId).subscribe(() => {  
  //     this.updateFilteredSuppliers();  
  //   });  
  // }  


  updateSupplier(supplierId: number, contactPerson: string, email: string, phone: string) {  
    const updatedData = { contactPerson, email, phone }; // Prepare updated data  
    this.supplierService.updateSupplier(supplierId, updatedData).subscribe({  
      next: () => {  
        this.updateFilteredSuppliers();  
      },  
      error: (err) => {  
        console.error('Update failed', err); // Log the error  
      }  
    });  
  }  
  
  removeSupplier(supplierId: number) {  
    this.supplierService.removeSupplier(supplierId).subscribe({  
      next: () => {  
        this.updateFilteredSuppliers();  
      },  
      error: (err) => {  
        console.error('Delete failed', err); // Log the error  
      }  
    });  
  }

  filterSuppliers() {  
    this.filteredSuppliers = this.supplierService.filterSuppliers(this.searchTerm);  
  }  

  sortSuppliers() {  
    this.filteredSuppliers = this.supplierService.sortSuppliers(this.sortBy);  
  }  

  private updateFilteredSuppliers() {  
    this.filteredSuppliers = this.supplierService.getSuppliers();  
  }  

  private resetNewSupplier() {  
    this.newSupplier = new Supplier();  
  }  
}
