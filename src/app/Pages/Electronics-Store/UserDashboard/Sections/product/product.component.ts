import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../../../Services/productServices/product-service.service';
import { ProductModalComponent } from '../../../../../Components/Modal/product-modal/product-modal.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,ProductModalComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  isEditMode = false;
  selectedProductId: number | null = null;
  isModalVisible = false;

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
  productsArray: any[] = [];
  filteredProducts: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Open modal for adding new product
  openAddProductModal() {
    this.isEditMode = false;
    this.resetFormState();
    this.isModalVisible = true;
  }

  // Open modal for editing product
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

    this.isModalVisible = true;
  }

  // Close modal
  onCancelModal() {
    this.isModalVisible = false;
  }
  closeModal() {
  this.isModalVisible = false;
}

  // Save or Update logic
  onSaveProduct() {
    if (this.isEditMode) {
      this.updateProduct();
    } else {
      this.saveProduct();
    }
  }

 saveProduct() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('User not authenticated');
    return;
  }

  if (!this.imageFile) {
    alert('Please select an image file.');
    return;
  }

  const productData = {
    name: this.product.name,
    price: this.product.price,
    category: this.product.category,
    quantity: this.product.quantity,
    description: this.product.description,
    gstType: this.product.gstType,
    gstRate: this.product.gstRate
  };

  this.productService.addProduct(productData, this.imageFile, token).subscribe({
    next: () => {
      alert('Product added successfully');
      this.resetFormState();
      this.isModalVisible = false;
      this.loadProducts();
    },
    error: () => {
      alert('Failed to add product');
    }
  });
}

updateProduct() {
  if (!this.selectedProductId) return;

  const token = localStorage.getItem('token');
  if (!token) {
    alert('User not authenticated');
    return;
  }

  const productData = {
    name: this.product.name,
    price: this.product.price,
    category: this.product.category,
    quantity: this.product.quantity,
    description: this.product.description,
    gstType: this.product.gstType,
    gstRate: this.product.gstRate
  };

  this.productService.updateProduct(
    this.selectedProductId,
    productData,
    this.imageFile ?? undefined  // ✅ Safely handle null
  ).subscribe({
    next: () => {
      alert('Product updated successfully');
      this.resetFormState();
      this.isModalVisible = false;
      this.loadProducts();
      this.isEditMode = false;
    },
    error: (err) => {
      console.error('Update failed', err);
      alert('Failed to update product');
    }
  });
}




  // Delete product
  deleteProduct(id: number) {
    if (confirm('Are you sure to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            alert(response.message);
            this.loadProducts();
          } else {
            alert('Error: ' + response.error);
          }
        },
        error: (err) => {
          console.error('Error deleting product', err);
        }
      });
    }
  }

  // Load all products
  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (resPro) => {
        this.filteredProducts = resPro;
      }
    });
  }

  // Get image URL
  getImageUrl(product_id: number): string {
    return this.productService.getImageUrl(product_id);
  }

  // Reset product form state
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
  }

  // Store selected file from modal
  onFileSelected(file: File) {
    this.imageFile = file;
  }
}
