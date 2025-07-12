import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Review } from '../../../../../model/review/review';
import { ReviewService } from '../../../../../Services/reviewService/review.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  name: string = '';
  reviewText: string = '';
  suggestionText: string = '';
  rating: number = 0;
  displayPicture: string | null = null;
  emojis: string[] = ['😞', '😐', '😊', '😄', '😍'];
  showReviews: boolean = false;
  private genAI: GoogleGenerativeAI;

  reviews: any[] = [];

  addReviews: Review ={
    id: 0,
    reviewerName: '',
    comment: '',
    rating: ''
  };

  constructor(private reviewService: ReviewService) {
    // Initialize Gemini API with your API key
    this.genAI = new GoogleGenerativeAI('AIzaSyBYGqAev81pI_5A1Ut1K27ssljqjCcvY9U');
  }

  ngOnInit(): void {
    // Load existing reviews from localStorage
    this.loadReviews();
  }

  loadReviews(): void {
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      this.reviews = JSON.parse(savedReviews);
      this.showReviews = this.reviews.length > 0;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.displayPicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async generateSuggestion(): Promise<void> {
    if (this.reviewText.trim()) {
      try {
        const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `construct a feedback sentence from the given text which is short and professional for product review in that only particular launguage  which is human:\n\n${this.reviewText}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        this.suggestionText = response.text();
      } catch (error) {
        console.error('Error generating suggestion:', error);
        this.suggestionText = 'Unable to generate suggestion. Please try again.';
      }
    } else {
      this.suggestionText = 'Please enter some review text to generate a suggestion.';
    }
  }

  completeWithSuggestion(): void {
    if (this.suggestionText) {
      this.reviewText = this.suggestionText;
      this.suggestionText = ''; // Clear suggestion after using it
    }
  }

  submitReview(): void {
    if (this.addReviews.reviewerName && this.addReviews.comment && this.addReviews.rating) {
      const newReview = {
        name: this.name,
        reviewText: this.reviewText,
        rating: this.rating,
       
      };


      

      this.reviews.unshift(newReview);
      localStorage.setItem('reviews', JSON.stringify(this.reviews));
      this.showReviews = true;

      // Reset form
      this.name = '';
      this.reviewText = '';
      this.suggestionText = '';
      this.rating = 0;
      this.displayPicture = null;
    }
  }
}