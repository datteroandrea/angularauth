import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
    if(authenticationService.isLoggedIn()){
      this.router.navigateByUrl('');
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: '',
      userpass: ''
    });
  }

  login(credentials){
    this.authenticationService.login(credentials).subscribe((res: any) => {
      if(!res.token) {
        this.message = "Wrong email or password";
      } else {
        this.router.navigateByUrl("/");
      }
    });
  }

}
