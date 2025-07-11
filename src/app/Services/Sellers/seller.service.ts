import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private apiUrl = 'http://localhost:8080/api/sellers';

  constructor(private http: HttpClient) {}

  addSeller(seller: any) {
    return this.http.post(this.apiUrl, seller);
  }

  getSellers() {
    return this.http.get(this.apiUrl);
  }
}