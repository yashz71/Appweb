import { Component,  OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{

ngOnInit(){
 
}
constructor(private auth:AuthenticationService,private router: Router,
  private prod:ProductsService
  ){}
onc(){
  console.log("jjj");
this.auth.verify().subscribe(

  res=>{
    if(res.message!="No token provided!" || res.message!="Token has expired." || res.message!="Invalid token."){
      console.log(res.message);
      console.log("kkkk");

    }
    else{
    console.log("youpiii");
    this.router.navigate(["/products"]);
    }

  }
)

}

}