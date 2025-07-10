import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Services/productServices/product-service.service';
import { product } from '../../model/product-model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductComponent implements OnInit {
  products: product[] = [];

  CGST = "CGST";
  SGST = "SGST";
  IGST = "IGST"; // Integrated
  UTGST = "UTGST"; // Union territory

  newProduct: product = {
    product_name: '',
    product_price: 0,
    stock_quantity: 0,
    product_category: '',
    product_description: '',
    product_gstType: '',
    product_gstRate: 0
  };

  isEditing: boolean = false;
  selectedImage: File | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  addProduct(): void {
    if (!this.selectedImage) {
      alert("Please select a product image.");
      return;
    }

    this.productService.addProduct(this.newProduct, this.selectedImage).subscribe((response: any) => {
      alert(response.message);
      this.loadProducts();
      this.resetForm();
    });
  }

  editProduct(product: product): void {
    this.newProduct = { ...product };
    this.isEditing = true;
  }

  updateProduct(): void {
    this.productService.updateProduct(this.newProduct).subscribe((message: string) => {
      alert(message);
      this.loadProducts();
      this.isEditing = false;
      this.resetForm();
    });
  }

  deleteProduct(product_id: any): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(product_id).subscribe({
        next: (res) => {
          alert(res.message);
          this.loadProducts();
        },
        error: (err) => {
          alert('Failed to delete product. Check console for details.');
          console.error(err);
        }
      });
    }
  }

  resetForm(): void {
    this.newProduct = {
      product_name: '',
      product_price: 0,
      stock_quantity: 0,
      product_category: '',
      product_description: '',
      product_gstType: '',
      product_gstRate: 0
    };
    this.selectedImage = null;
    this.isEditing = false;
  }
}
