// -----------------------------------product-------------------------------
export class Product {  
  id!: number;  
  name!: string;  
  description!: string;  
  price!: number;  
  quantity!: number;  
}

// -----------------------------------product-------------------------------

// inventory-item.model.ts--------------------------------------------------  
export class InventoryItem {  
  constructor(  
    public id: number,  
    public name: string,  
    public stock: number,  
    public location: string,  
    public description: string,  
    public price: number  
  ) {}  
}

// inventory-item.model.ts--------------------------------------------------  

// order-item.model.ts  
export class OrderItem {  
 
    id!: string; 
    customerName!: string; 
    product!: string;
    quantity!: number;  
    status!: string;  
    orderDate!: Date;  
    totalPrice!: number;  

}

// supplier.model.ts  
export class Supplier {  
   id!: number; 
   name!: string;
   contactPerson!: string; 
   email!: string;  
   phone!: string;  
   address!: string;
   createdAt!: Date;  
   updatedAt!: Date ; 
  
}

// sale.model.ts  
export class Sale {  

   id!: number;
   productName!: string;  
   quantity!: number;  
   price!: number;  
   totalAmount!: number;  
   customerName!: string;  
   saleDate!: Date;  
  
}

// customer.model.ts  
export class Customer {  
  
     id!: number; 
     name!: string;  
     email!: string;  
     phone!: string;  
     address!: string;  
     createdAt!: Date;  
     updatedAt!: Date; 
 
}


// registration.model.ts  
export class UserModel
{

  id!: string;
  name!: string;
  email!: string;
  password!: string;
  photo!:string;
  role!:string;  
}


export interface AuthResponse {
  token:string;
  user:UserModel;


}


