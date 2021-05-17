import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router: Router) { }

  registerUser(userDetails) {
    return this.http.post<
    {
      message: string,
      error? :boolean
    }>
    (`${environment.baseUrl}/api/users/register`,userDetails)
  }

  loginUser(credentials) {
    return this.http.post<{
      token: string,
      email: string,
      role :string,
      fullName: string,
      userId: string,
      error: boolean
    }>(`${environment.baseUrl}/api/users/login`,credentials)
  }

  getUserDetails() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    if(userDetails) {
      return userDetails;
    }
  }
  isLoggedIn() {
    const userDetails = this.getUserDetails();
    return userDetails ? true : false;
  }
  isAdmin() {
    const userDetails = this.getUserDetails();
    return userDetails && userDetails.role === 'admin' ? true : false;
  }
  isUser() {
    const userDetails = this.getUserDetails();
    return userDetails && userDetails.role === 'user' ? true : false;
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl(`/login`)
  }

  getToken() {
    const userDetails =JSON.parse(localStorage.getItem('userDetails'));
    return userDetails.token;
  }
}
