import { Component,OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../services/product.model';
@Component({
  selector: 'app-k-products',
  templateUrl: './k-products.component.html',
  styleUrls: ['./k-products.component.css']
})
export class KProductsComponent implements OnInit {
  constructor(private productsService: ProductsService,
   ){}
 products!:Products[];
  ngOnInit(): void {
    this.getProducts();
  }
  applyclass=true;
  
  
  page: number=1;
      limit: number=3;
      totalDocs!: number;
      totalPages!: number;
      hasPrevPage!: boolean;
      prevPage!: number;
      hasNextPage!: boolean;
      nextPage!: number;
      inDex=1;
  getProducts(){
    this.productsService.getProductsPagine(this.page, this.limit)
       .subscribe((data:any) => {
         this.products = data.docs;
         this.page = data.page;
         this.limit = data.limit;
         this.totalDocs = data.totalDocs;
         this.totalPages = data.totalPages;
         this.hasPrevPage = data.hasPrevPage;
         this.prevPage = data.prevPage;
         this.hasNextPage = data.hasNextPage;
         this.nextPage = data.nextPage;
         console.log("données reçues");
       });
    }
    
  
  
      
    
    indexPlus(){
      if(this.hasNextPage){
        this.page=this.nextPage;
        this.inDex+=1;
        this.getProducts();
      }
      
  
  
    }
    indexMin(){
      if(this.hasPrevPage){
        this.page=this.prevPage;
        this.inDex-=1;
        this.getProducts();
      }
    }
    pageSuivante(){
      if(this.hasNextPage){
        this.page=this.nextPage;
        this.getProducts();
      }
    }
    pagePrecedente(){
      if(this.hasPrevPage){
        this.page=this.prevPage;
        this.getProducts();
      }
    }
  
  
}
