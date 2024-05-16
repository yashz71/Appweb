import { Component, OnInit } from '@angular/core';
import { FormControl, Validators,FormBuilder, FormGroup  } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router,ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 
export class LoginComponent implements OnInit{
constructor(private auth:AuthenticationService,
  private router :Router,
    private fb:FormBuilder,
    private cookieService: CookieService,
    private prod:ProductsService
    ){}
ngOnInit(): void {
  this.userFormGroup=this.fb.group({
    username :this.fb.control(""),
    password : this.fb.control("")
   })   
   /*this.auth.verify().subscribe(res =>{
    if(res == false){
      this.router.navigate(["/home/"]);
    }
   })*/
   this.deleteCookie();
   
}
cookieName!:string;
 deleteCookie() {
  document.cookie = `jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Assuming your JWT is stored in a cookie named "jwt"
res!:boolean | String;

  hide = true;
  userFormGroup!: FormGroup;
  error!:any;
  valid!:any;
  handleLogin(){
    const username:string = this.userFormGroup.value.username;
    const password:String = this.userFormGroup.value.password;
   

    this.auth.login(username,password).subscribe(
      res => {
        if(res.message=="Invalid credentials" || res.message=="User Not found." || res.message=="Invalid Password!"){
          this.error=res.message;
          return;
        }
        this.auth.authenticated=false;
        this.valid=res.message;
        const jwtToken = res.accessToken;
        

        this.cookieService.set('jwtToken', jwtToken, 1, '/', 'localhost', true, 'None');
        setTimeout(() => {
          this.router.navigate(["/home/"]);
        }, 2000);
       
        // 'jwtToken' is the name of the cookie, '1' is the number of days until it expires
    // '/' specifies the root path of the cookie, 'example.com' is the domain (change it to your domain)
    // 'true' indicates that the cookie should only be sent over HTTPS (secure)
    // 'None' means the cookie is not accessible via JavaScript (httpOnly)
        
       /* setTimeout(() => {
          this.auth.verify().subscribe( resp => {
            console.log(resp); 
          }); 
        }, 10000);*/
      }, 
    ) ;
    
    
   
  }
  
goSignUp(){
  this.router.navigate(["/signup/"]);
}

}

  

