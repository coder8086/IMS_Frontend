import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Seller } from '../../../../../model/seller/seller';
import { SellerService } from '../../../../../Services/Sellers/seller.service';

@Component({
  selector: 'app-sellers',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.css'
})
export class SellersComponent implements OnInit{
  
  sellers: Seller[] = [];

   newSeller = {
    name: '',
    email: '',
    grossSale:0,
    earning: 0,
    imagePath:''
  };

  inputFile: File | null = null;

  selectedFile: File | null = null;

  searchTerm: string = '';
  searchField: string = 'name'; // Default filter is name
  editingIndex: number | null = null;

  constructor(private sellerService: SellerService){}
  
  ngOnInit(): void {
    this.fetchSeller();  
  }

  onFileSelected(event: Event, inputFile:HTMLInputElement) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }

  addSellerWithImg() {
    if (!this.selectedFile) {
      alert('Please select an image file');
      return;
    }

    this.sellerService.addSellerWithImage(
      this.newSeller.name,
      this.newSeller.email,
      this.newSeller.grossSale,
      this.newSeller.earning,
      this.selectedFile
    ).subscribe({
      next: res => {
   
        alert('Seller added successfully!');
        this.fetchSeller();
        this.clearForm();
      },
      error: err => {
        console.error(err);
        alert('Error adding seller');
      }
    });
  }

  fetchSeller(){
    this.sellerService.getSellers().subscribe({
      next: (resp: any) => {
        this.sellers = resp;
      },
      error: (er) => {
        console.log("Error while getting seller ",er);
      }
    });
  }

  get filteredSellers() {
    if (!this.searchTerm.trim()) {
      return this.sellers;
    }

    return this.sellers.filter((seller) => {
      const field = this.searchField;
      const value = seller[field as keyof Seller];

      if (typeof value === 'number') {
        return value.toString().includes(this.searchTerm);
      }

      if (typeof value === 'string') {
        return value.toLowerCase().includes(this.searchTerm.toLowerCase());
      }

      return false;
    });
  }

  

  editSeller(index: number) {
  
  }

  deleteSeller(index: number) {
  
    
  }

  clearForm():void{
    this.newSeller.name= '';
    this.newSeller.earning = 0;
    this.newSeller.email = '';
    this.newSeller.grossSale = 0;
    this.newSeller.imagePath = '';
   this.selectedFile = null;
   }


}
