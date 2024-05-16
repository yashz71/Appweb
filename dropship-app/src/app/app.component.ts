import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { data } from './services/data';
import { ProductsService } from './services/products.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  value = 'Search Product';
  ngOnInit(){
    this.auth.verify().subscribe(res =>{
      if(res==false){
      this.conn=res;
    }
      else{
        this.router.navigate(["/login/"]);

      }
    })
  }
  constructor(private router:Router,
    private auth:AuthenticationService,
    private prod:ProductsService

    ){}
  nom: string='';
  conn=true;
  panelOpenState = false;
  sugg:any;
  
 search(){
  this.prod.getProductS(this.nom).subscribe(res=>{
    console.log(res);

  })
 }
}
