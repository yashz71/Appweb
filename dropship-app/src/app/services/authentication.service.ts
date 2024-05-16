import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Users } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users!: Users[];

  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers:new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  url_signin= "http://localhost:8080/api/signin";
  url_signup= "http://localhost:8080/api/signup"; 
  url_verify= "http://localhost:8080/api/verify"; 
  username!: String;
  password!:string;
  authenticated=true;
  login(userName: string, userPassword: String):Observable<any> {
    return this.http.post<any>(this.url_signin, { userName, userPassword });
       
}
  verify():Observable<any>{
    return this.http.get<any>(this.url_verify, { withCredentials: true });
}
  addUser(user:Users):Observable<any>{
    return this.http.post<Users>(this.url_signup, user, this.httpOptions);
  }
  logout() {
    localStorage.removeItem('token');
  }
  
  isLoggedIn() {
    return !!localStorage.getItem('token');

  }


}
