  import { Component, OnInit } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { Seller } from '../../../../../model/seller/seller';
  import { SellerService } from '../../../../../Services/Sellers/seller.service';
  import { SellerVendorModalComponent } from '../../../../../Components/Modal/seller-vendor-modal/seller-vendor-modal.component';

  @Component({
    selector: 'app-sellers',
    standalone: true,
    imports: [FormsModule, CommonModule, SellerVendorModalComponent],
    templateUrl: './sellers.component.html',
    styleUrl: './sellers.component.css'
  })
  export class SellersComponent implements OnInit {

    sellers: Seller[] = [];
    searchTerm: string = '';
    searchField: string = 'name'; // Default filter
    editingIndex: number | null = null;
    showModal: boolean = false;

    newSeller: Seller = {
      name: '',
      id: '',
      email: '',
      grossSale: null,
      earning: null,
      icon: ''
    };

    constructor(private sellerService: SellerService) {}

    ngOnInit(): void {
      this.fetchSeller();
    }

    fetchSeller(): void {
      this.sellerService.getSellers().subscribe({
        next: (resp: any) => {
          this.sellers = resp;
        },
        error: (er) => {
          console.log("Error while getting sellers", er);
        }
      });
    }

    get filteredSellers() {
      if (!this.searchTerm.trim()) return this.sellers;

      return this.sellers.filter((seller) => {
        const value = seller[this.searchField as keyof Seller];

        if (typeof value === 'number') {
          return value.toString().includes(this.searchTerm);
        }
        if (typeof value === 'string') {
          return value.toLowerCase().includes(this.searchTerm.toLowerCase());
        }

        return false;
      });
    }

    openAddSellerModal(): void {
      this.newSeller = {
        name: '',
        id: '',
        email: '',
        grossSale: null,
        earning: null,
        icon: ''
      };
      this.editingIndex = null;
      this.showModal = true;
    }

    editSeller(index: number): void {
      const seller = this.filteredSellers[index];
      const realIndex = this.sellers.indexOf(seller);
      this.newSeller = { ...seller };
      this.editingIndex = realIndex;
      this.showModal = true;
    }

    deleteSeller(index: number): void {
      const seller = this.filteredSellers[index];
      const realIndex = this.sellers.indexOf(seller);
      if (confirm('Are you sure you want to delete this seller?')) {
        this.sellers.splice(realIndex, 1);
      }
    }

    closeModal(): void {
      this.showModal = false;
    }

    handleFileInput(file: File): void {
      const reader = new FileReader();
      reader.onload = () => {
        this.newSeller.icon = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

    handleSave(seller: Seller): void {
      if (this.editingIndex !== null) {
        this.sellers[this.editingIndex] = seller;
      } else {
        this.sellers.push(seller);
      }
      this.closeModal();
    }
  }
