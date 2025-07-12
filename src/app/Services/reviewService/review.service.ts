import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../../model/review/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl: string = "http://localhost:8080/api";

  constructor(private http:HttpClient){}

  private getAuthHeaders(): HttpHeaders{
    const token = localStorage.getItem("token");
    return new HttpHeaders(
      {
        'Authorization': `Berer ${token}`,
        'Content-Type' : 'Application/json'
      }
    );
  }

  addReview(review:Review){
    this.http.post(`${this.baseUrl}/addReview`, review, {headers: this.getAuthHeaders(), responseType : 'json'})
  }
}
