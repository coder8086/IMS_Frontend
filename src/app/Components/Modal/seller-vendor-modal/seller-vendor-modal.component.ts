import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-vendor-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-vendor-modal.component.html',
  styleUrl: './seller-vendor-modal.component.css'
})
export class SellerVendorModalComponent {
  @Input() show = false;
  @Input() isEditMode = false;
  @Input() seller: any = {
    name: '',
    email: '',
    grossSale: '',
    earning: '',
    icon: ''
  };

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @Output() fileSelected = new EventEmitter<File>();

  Close() {
    this.close.emit();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.save.emit(this.seller);
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileSelected.emit(file);
    }
  }
}
