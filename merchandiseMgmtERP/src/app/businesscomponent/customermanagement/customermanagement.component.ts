// customer-management.component.ts  
import { Component, OnInit } from '@angular/core';  
import { Customer } from '../../model/sale.model';
import { CustomerService } from '../../services/customermanagement.service';


@Component({  
  selector: 'app-customer-management',  
  templateUrl: './customermanagement.component.html',  
  styleUrls: ['./customermanagement.component.css']  
})  
export class CustomerManagementComponent implements OnInit {  
  customers: Customer[] = [];  
  filteredCustomers: Customer[] = [];  
  searchTerm: string = '';  
  newCustomer: Customer = new Customer();  

  constructor(private customerService: CustomerService) {}  

  ngOnInit(): void {  
    this.customerService.loadCustomers().subscribe(data => {  
      this.customers = data;  
      this.filteredCustomers = data; // Initialize filtered customers  
    });  
  }  

  addCustomer() {  
    this.newCustomer.id = this.customers.length + 1; // Simple ID generation  
    this.newCustomer.createdAt = new Date();  
    this.newCustomer.updatedAt = new Date();  

    this.customerService.addCustomer(this.newCustomer);  
    this.updateFilteredCustomers();  
    this.resetNewCustomer();  
  }  

  updateCustomer(customerId: number) {  
    const updatedCustomer: Partial<Customer> = {  
      email: 'updated@example.com', // Example update  
      phone: '+1122334455'  
    };  
    this.customerService.updateCustomer(customerId, updatedCustomer);  
    this.updateFilteredCustomers();  
  }  

  removeCustomer(customerId: number) {  
    this.customerService.removeCustomer(customerId);  
    this.updateFilteredCustomers();  
  }  

  filterCustomers() {  
    this.filteredCustomers = this.customerService.filterCustomers(this.searchTerm);  
  }  

  private updateFilteredCustomers() {  
    this.filteredCustomers = this.customerService.getCustomers();  
  }  

  private resetNewCustomer() {  
    this.newCustomer = new Customer();  
  }  
}