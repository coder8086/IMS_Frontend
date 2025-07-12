import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Seller } from '../../model/seller/seller';

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

  getSellers() {
    return this.http.get(`${this.apiUrl}/my-sellers`,{headers: this.getAuthHeaders()});
  }
}