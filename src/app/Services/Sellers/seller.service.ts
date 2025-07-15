import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Seller } from '../../model/seller/seller';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

    // Helper to build headers with token
    private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    }

  addSeller(seller:Seller) {
    return this.http.post(`${this.apiUrl}/addSeller`, seller,{headers: this.getAuthHeaders(), responseType: 'json'});
  }

  addSellerWithImage(
    name: string,
    email: string,
    grossSale: number,
    earning: number,
    imageFile: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    if (email) formData.append('email', email);
    if (grossSale !== null && grossSale !== undefined) formData.append('grossSale', grossSale.toString());
    if (earning !== null && earning !== undefined) formData.append('earning', earning.toString());
    formData.append('image', imageFile);

    const token = localStorage.getItem('token'); // or sessionStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/addSellerImg`, formData, { headers });
  }

  getSellers() {
    return this.http.get(`${this.apiUrl}/my-sellers`,{headers: this.getAuthHeaders()});
  }
}