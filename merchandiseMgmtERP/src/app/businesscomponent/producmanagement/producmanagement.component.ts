import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/sale.model';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
@Component({
  selector: 'app-producmanagement',
  templateUrl: './producmanagement.component.html',
  styleUrl: './producmanagement.component.css'
})
export class ProducmanagementComponent implements OnInit {

  products: Product[] = [];
  newProduct: Product = new Product();

  constructor(private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: res => {
        this.products = res;
      },
      error: error => {
        console.log(error);
        alert(error);
      }
    });
  }


  addProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe({
      next: res => {
        this.newProduct = new Product();
        this.loadProducts();
      },
      error: error => {
        console.log(error);
        alert(error);
      }
    });
  }


  editProduct(productId: number ): void {
    this.router.navigate(['updateproduct',productId]);
  }


  deleteProduct(productId: number ): void {
    if (productId) {
      this.productService.deleteProduct(productId).subscribe(success => {
        if (success) {
          this.products = this.products.filter(p => p.id !== productId); 
          this.router.navigate(['/product']);
          
        }
      });
    }
  }





}
