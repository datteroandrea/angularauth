import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../../data/appdata';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(credentials) {
    var response = this.http.post<any>(url+'/auth/login', credentials);
    response.subscribe((res)=>{
      if(res.token){
        localStorage.setItem('token',res.token);
      }
    });
    return response;
  }

  register(user) {
    return this.http.post<any>(url+'/auth/register', user);
  }

  unregister(credentials) {
    return this.http.post<any>(url+'/auth/unregister', credentials);
  }

  logout(){
    if(this.isLoggedIn()){
      localStorage.removeItem('token');
    }
  }

  isLoggedIn(){
    return localStorage.getItem('token') != null;
  }

}
