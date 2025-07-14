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

  newSeller: Seller = {
    name: '',
    id: '',
    email: '',
    grossSale: null,
    earning: null,
    icon: ''
  };

  searchTerm: string = '';
  searchField: string = 'name'; // Default filter is name
  editingIndex: number | null = null;


  constructor(private sellerService: SellerService){

  }

  ngOnInit(): void {
    this.fetchSeller();
      
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

  addSeller(): void {
    if (this.newSeller.name && this.newSeller.email && this.newSeller.earning) {
      this.sellerService.addSeller(this.newSeller).subscribe({
        next: (resp:any) => {
          alert(resp.message);
          console.log("New seller added");
          this.fetchSeller();
          this.clearForm();
        },
        error: (er) => {
          console.log("Error while adding seller", er);
        }
      });
    }
    else {
      alert('Please fill in all required fields.');
   
    }
  }

  editSeller(index: number) {
    const seller = this.filteredSellers[index];
    const realIndex = this.sellers.indexOf(seller);
    this.newSeller = { ...seller };
    this.editingIndex = realIndex;
  }

  deleteSeller(index: number) {
    const seller = this.filteredSellers[index];
    const realIndex = this.sellers.indexOf(seller);
    if (confirm('Are you sure you want to delete this seller?')) {
      this.sellers.splice(realIndex, 1);
    }
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newSeller.icon = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  clearForm() {
    this.newSeller = {
      name: '',
      id: '',
      email: '',
      grossSale: null,
      earning: null,
      icon: ''
    };
    this.editingIndex = null;
  }
}
