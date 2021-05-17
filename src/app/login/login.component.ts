import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message:string;
  error:string;
  isLoading = false;
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(form:NgForm) {
    this.isLoading=true;
    this.auth.loginUser(form.value).subscribe(res => {
      this.isLoading=false;
      if(!res.error) {
        localStorage.setItem("userDetails",JSON.stringify(res))
        this.router.navigate([`/display-product`])
      }
      else {
        this.error = 'login failed'
      }
    }, err => {
      this.error='server error cant login'
    })
  }


}
