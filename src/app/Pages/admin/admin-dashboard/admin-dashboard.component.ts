import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../Services/AdminService/admin-service.service';
import { UserData } from '../../../model/User-Data';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  usersArray: UserData[] = [];

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUser();
  }

  // Fetch the list of users from the backend
  fetchUser(): void {
    this.adminService.getUsers().subscribe({
      next: (data) => {
        this.usersArray = data;
      },
      error: (err) => {
        console.error('Error while fetching users:', err);
      },
    });
  }

  // Handle updating the status of users (approve/reject)
  updateStatus(id: number | undefined, status: string): void {
    if (id === undefined) {
      console.error('User ID is undefined');
      return;
    }

    
    if (status === 'ACTIVE' && confirm(`Are You sure want To Approve this User?`)) {
      this.adminService.approveUser(id).subscribe({
        next: () => {
          alert("User can login now ")
          this.fetchUser();  // Re-fetch the user list after status update
        
        },
        error: (err) => {
          alert('Error approving user');
      
        
        }
      });
    } else if (status === 'REJECTED' && confirm(`Are You sure want To Reject this User?`)) {
      this.adminService.rejectUser(id).subscribe({
        next: () => {
          alert('User rejected successfully!');
          this.fetchUser();  // Re-fetch the user list after status update
        },
        error: (err) => {
          alert('Error rejecting user');
          console.error(err);
        }
      });
    }
  }

  // Helper method to set the status color based on status value
  getStatusColor(status: string | undefined): string {
    if (status === undefined) {
      return 'black';  // Default color for undefined status
    }

    switch (status.toUpperCase()) {
      case 'ACTIVE':
        return 'green';  // Active users in green
      case 'REJECTED':
        return 'red';  // Rejected users in red
      case 'PENDING':
        return 'orange';  // Pending users in orange
      default:
        return 'black';  // Default color for unrecognized statuses
    }
  }

  // Logout functionality
  navigate(event: Event): void {
    const ac_option = (event.target as HTMLSelectElement).value;
    if (ac_option === 'logout') {
      this.router.navigate(['/']);
    }
  }

  // Image URL to display in the table
  imageURL = 'https://imgs.search.brave.com/CvAZteVhIRcQ-a75CvT8kMAGTzoq3ULueUbbugOqVdY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzkxLzIx/Lzc2LzkxMjE3NjFi/YjI2YTE0ZTMzYjdi/OTdmZjg5MzM1NGQ4/LmpwZw';

  // View image in a new tab
  viewImage(url: string): void {
    window.open(url, '_blank');
  }

  // Approve user based on user id
  approveUser(id: number | undefined): void {
    if (id !== undefined) {
      this.updateStatus(id, 'ACTIVE');  // Set status to ACTIVE for approval
    }
  }

  // Reject user based on user id
  rejectUser(id: number | undefined): void {
    if (id !== undefined) {
      this.updateStatus(id, 'REJECTED');  // Set status to REJECTED for rejection
    }
  }
}
