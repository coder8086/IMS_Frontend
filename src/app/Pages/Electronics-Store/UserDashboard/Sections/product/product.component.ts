import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../../../Services/productServices/product-service.service';
import { isNullOrUndef } from 'chart.js/dist/helpers/helpers.core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  isEditMode = false;
  selectedProductId: number | null = null;

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  product = {
    name: '',
    price: '',
    category: '',
    quantity: '',
    description: '',
    gstType: '',
    gstRate: ''
  };
  imageFile: File | null = null;



  categories: string[] = [
    'Smartphone',
    'Laptop & PC',
    'Refrigerator',
    'Washing Machine',
    'AC',
  ];

  CGST = 'CGST';
  SGST = 'SGST';
  IGST = 'IGST';
  UTGST = 'UTGST';


  
  productsArray: any[] = [];
  filteredProducts: any[] = [];

  constructor(private productService: ProductService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
    } else {
      this.imageFile = null; // fallback if user cancels selection
    }
  }
  

  ngOnInit(): void {

    this.loadProducts();
      
  }

  saveProduct() {
    const token = localStorage.getItem('token'); // Make sure you store the JWT token
    console.log('Get token to save product', token);
    if (!token) {
      alert('User not authenticated');
      console.log('token not authenticated');

      return;
    }

    if (!this.imageFile) {
      alert('Please select an image file.');
      return;
    }

    this.productService.addProduct(this.product, this.imageFile, token).subscribe({
      next: (res) => {
        console.log('Product added:', res);
        alert('Product added successfully!');
        this.loadProducts();
        this.resetFormState();
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Error adding product.');
      }
    });
  }

  loadProducts(){

    this.productService.getProducts().subscribe({
      next: (resPro)=>{
        console.log(resPro);
        this.filteredProducts = resPro;
      }
    });
  }

  editProduct(product: any) {
    this.isEditMode = true;
    this.selectedProductId = product.product_id;
  
    this.product = {
      name: product.productName,
      price: product.product_price,
      category: product.product_category,
      quantity: product.product_available_stock_quantity,
      description: product.product_description,
      gstType: product.gst_type,
      gstRate: product.gst_rate,
    };
  }

  updateProduct() {

    if (!this.selectedProductId) return;
  
    this.productService.updateProduct(this.selectedProductId,this.product
    ).subscribe({
      next: (res) => {
        alert('Product updated successfully');
        this.resetFormState();
        this.loadProducts();
        this.isEditMode = false;
      },
      error: (err) => {
        console.error('Update failed', err);
        alert('Failed to update product');
      }
    });
  }
  
  cancelEdit() {
    this.resetFormState();
    this.isEditMode=false;
  }


// product.component.ts
deleteProduct(id: number){
  this.productService.deleteProduct(id).subscribe({
    next: (response) => {
      if (response.status === 'success') {
        alert(response.message); // Or use a toast/snackbar
        this.loadProducts(); // Refresh the list
      } else {
        alert('Error: ' + response.error);
      }
     
    },
    error: (err) => {
      console.error('Error deleting product', err);
    }
  });
}


  getImageUrl(product_id: number): string {
    return this.productService.getImageUrl(product_id);
  }
 
  resetFormState() {
    this.product = {
      name: '',
      price: '',
      category: '',
      quantity: '',
      description: '',
      gstType: '',
      gstRate: ''
    };
    this.imageFile = null;
  
    // Clear file input
    if (this.fileInputRef?.nativeElement) {
      this.fileInputRef.nativeElement.value = '';
    }
  }
  
}
