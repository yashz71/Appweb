import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, map, tap, catchError, of } from 'rxjs';
import { Products } from './product.model';
import { data } from './data';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  url ="http://localhost:8010/api/products";
  private httpOptions = {
    headers:new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  products!:Products[];
  
  getProducts(): Observable<Products[]>{
    return this.http.get<Products[]>(this.url);
  
  
  }
  getProductsPagine(page:number, limit:number): Observable<any>{
    return this.http.get<any>(this.url +"?page="+page+"&limit="+limit);

  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
  
      return of(result as T);
    }
  };
  
  getProduct(title: String):Observable<Products|undefined>{
    return this.http.get<Products|undefined>(this.url+"/" +title)
  
    
  
    .pipe(
      map( (a:any)=>{
        a.nom += "recu et transformer avec une pipe";
        return a;
      }),
      tap(_ =>{
        console.log("tap:assignment avec id="+title+"requete envoyer sur mongoDB cloud");
  
      }),
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + title))
    );
  }

  getProductS(title:string): Observable<any>{
    return this.http.get<any>(`${this.url+'T'}?title=${title}`);
  
  
  }
}
