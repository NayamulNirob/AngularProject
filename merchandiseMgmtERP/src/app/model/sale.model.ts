
//---------------------------------------- Sale ---------------------------------------------


//style Categories start
export class StyleCategories {
  id: number = 0
  name?: string;
}
//style Categories end
//Size start
export class Size {
  id: number = 0
  name?: string;
}
//Size end
//Trim start
export class Trim {
  id: number = 0
  name?: string;
}
//Fabric start (optional)
export class Fabric {
  id: number = 0
  name?: string;
  description?: string;
}
//Raw Material Categories start
export class RawMaterialCat {
  id: number = 0
  name?: string;
}



//-------------------------------------- Sale dependent --------------------------------------



// Style start
export class Style {
  id: number = 0
  code?: string;
  description?: string;
  categoriesId?: {
    id: number,
    name?: string
  }
}
//Measuremant Details
export class MeasuremntDetails {
  
  id: number = 0
  description?: string;
  tolerance?: string;
  small?: string;
  medium?: string;
  large?: string
  styleId?: {
    id: number,
    code?: string,
    description?: string,
    categoriesId?: {
      id: number,
      name?: string
    }
  }
}

//Measuremant Attachment 
export class MeasuremantAttachment {
  id: number = 0
  name?: string
  attachment?: string
  styleId?: {
    id: number,
    code: string
    description: string
    categoriesId?: {
      id: number,
      name: string
    }
  }
}


//  Raw Material /Attachment 
export class RawMaterial {
  id: number = 0
  name?: string
  description?: string
  unitPrice?: number
  attachment?: string
  styleId?: {
    id: number
    code?: string;
    description?: string;
    categoriesId?: {
      id: number,
      name?: string
    }
  }
  rawMaterialCatId?: {
    id: number
    name?: string;
  }
  uomId?: {
    id: number,
    name?: string
  }
  vendorId?: {
    id: number,
    company?: string,
    contactPerson?: string,
    cell?: string,
    email?: string,
    address?: string
  }
}
//  Style Attachment start
export class StyleAttachment {
  id: number = 0
  attachment?: string
  styleId?: {
    id: number,
    code: string,
    description: string,
    categoriesId?: {
      id: number,
      name: string
    },
  }
}
//  Style Material Quantity start
export class StyleMaterialQty {
  id: number = 0
  quantity?: number
  styleId?: {
    id: number,
    code: string,
    description: string,
    categoriesId: {
      id: number,
      name: string
    },
    createdAt: Date,
    updatedAt: Date
  }
  rawMaterialId?: {
    id: number,
    name: string,
    description: string,
    unitPrice: number,
    attachment: string,
    styleId: {
      id: number,
      code: string,
      description: string,
      categoriesId: {
        id: number,
        name: string
      },
      createdAt: Date,
      updatedAt: Date
    },
    rawMaterialCatId: {
      id: number,
      name: string
    },
    uomId: {
      id: number,
      name: string
    },
    vendorId: {
      id: number,
      company: string,
      contactPerson: string,
      cell: string,
      email: string,
      address: string
    }
  }
  sizeId?: {
    id: number,
    name: string
  }
}



//---------------------------------------- Inventory Table--------------------------------------



//  Warehouse start
export class Warehouse {
  id: number = 0
  name?: string
  city?: string
  contact?: string
}

//  Purchase Status start
export class PurchaseStatus {
  id: number = 0
  name?: string
}
//  Stock Adjustment start
export class StockAdjustment {
  id: number = 0
  name?: string
  factor?: number
}
//  Adjustment Material start
export class AdjustmentMaterail {
  id: number = 0
  remarks?: string
  quantity?: number
  price?: number
  stockAdjustmentId?: {
    id: number,
    name: string,
    factor: number
  }
  wareHouseId?: {
    id: number,
    name: string,
    city: string,
    contact: string
  }
  rawMaterialId?: {
    id: number,
    name: string,
    description: string,
    unitPrice: number,
    attachment: string,
    styleId: {
      id: number,
      code: string,
      description: string,
      categoriesId: {
        id: number,
        name: string
      },
      createdAt: Date
      updatedAt: Date
    },
    rawMaterialCatId: {
      id: number,
      name: string
    },
    uomId: {
      id: number,
      name: string
    },
    vendorId: {
      id: number,
      company: string,
      contactPerson: string,
      cell: string,
      email: string,
      address: string
    }
  }

}
//  Purchase start
export class Purchase {
  id: number = 0
  purchaseDate?: Date
  deliveryDate?: Date
  price?: number
  quantity?: number
  paid?: number
  total?: number
  vendorsId?: Vendors
  statusId?: PurchaseStatus
  wareHouseId?: Warehouse
  rawMaterialId?: {
    id: 0,
    name: string,
    description: string,
    unitPrice: number,
    attachment: string,
    styleId: Style
    rawMaterialCatId: RawMaterialCat
    uomId: UOM
    vendorId: {
      id: 0,
      company: string,
      contactPerson: string,
      cell: string,
      email: string,
      address: string
    }
  }
}


//  Stock start

export class Stock {
  id: number = 0;
  quantity?: number
  createDate?: Date
  updateDate?: Date
  rawMaterialId?: {
    id: number
    name: string
    description: string
    unitPrice: number
    attachment: string,
    styleId?: {
      id: number,
      code: string,
      description: string,
      categoriesId?: {
        id: number,
        name: string
      },

    },
    rawMaterialCatId?: {
      id: number
      name: string
    },
    uomId: {
      id: number,
      name: string
    },
    vendorId: {
      id: number,
      company: string,
      contactPerson: string,
      cell: string,
      email: string,
      address: string
    }
  }
}



//---------------------------------------- Other ------------------------------------------------



//  Vendors start
export class Vendors {
  id: number = 0;
  company?: string;
  contactPerson?: string;
  cell?: string;
  email?: string;
  address?: string;
}
//  Unit of Measurement start
export class UOM {
  id: number = 0;
  name?: string;
}



//---------------------------------------- BOM Table-----------------------------------------------



//  Department start
export class Department {
  id: number = 0;
  name?: string;
}
//  Labor Cost start
export class LaborCost {
  id: number = 0
  unitCost?: number
  hour?: number
  styleId?: {
    id: number
    code?: string
    description?: string
    categoriesId?: {
      id: number
      name?: string
    }
  }
  departmentId?: {
    id: number,
    name?: string
  }
}



//---------------------------------------- Buyers Table ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



//  Buyers start
export class Buyers {
  id: number = 0
  organization?: string
  contactPerson?: string
  phone?: string
  email?: string
  address?: string
  country?: string
}
//  Task start
export class Task {
  id: number = 0
  name?: string
}
//  Orders Status start
export class OrderStatus {
  id: number = 0
  name?: string
}
//  Orders start
export class OrderDetails {
  id: number = 0
  oderDate?: Date
  deliveryDate?: Date
  shippingAddress?: string
  orderUniId?: string
  totalAmount?: number
  paid?: number
  samount?: number
  mamount?: number
  lamount?: number
  styleId?: {
    id: number
    code?: string
    description?: string
    categoriesId?: {
      id: number
      name?: string
    }
    createdAt?: Date
    updatedAt?: Date
  }
  buyersId?: {
    id: number
    organization?: string
    contactPerson?: string
    phone?: string
    email?: string
    address?: string
    country?: string
  }
  orStatusId?: {
    id: number
    name?: string
  }

}

//  Time Action start
export class TimeAction {
  id: number = 0
  remarks?: string
  expectedStartDate?: Date
  actualStartDate?: Date
  expectedEndDate?: Date
  actualEndDate?: Date
  orderId?: OrderDetails
  taskId?: Task
}



//---------------------------------------- Report Table----------------------------------
