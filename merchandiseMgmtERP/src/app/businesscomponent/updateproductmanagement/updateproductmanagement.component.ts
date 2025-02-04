import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/sale.model';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-updateproductmanagement',
  templateUrl: './updateproductmanagement.component.html',
  styleUrl: './updateproductmanagement.component.css'
})
export class UpdateproductmanagementComponent implements OnInit {

  productId!: number;
  product:Product =new Product();
  errorMessage: string = '';
  

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.loadProduct();

  }

  loadProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: response => {
        this.product = response;
      },
      error: error => {
        console.log(error)
        this.errorMessage = 'Could not load product';
      }
    })
  }



  updateProduct(): void {
    if (this.product) {
      this.productService.editProduct(this.productId, this.product).subscribe({
        next: () => this.router.navigate(['/product']),  // Redirect after successful update  
        error: (error: HttpErrorResponse) => {
          this.errorMessage = 'An error occurred while updating the product';
        }
      });
    }
  }





}
