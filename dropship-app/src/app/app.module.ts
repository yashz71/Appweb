import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { NgImageSliderModule } from 'ng-image-slider';

import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { HomepageComponent } from './homepage/homepage.component';
import { BProductComponent } from './b-product/b-product.component';
import { GProductsComponent } from './g-products/g-products.component';
import { KProductsComponent } from './k-products/k-products.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ScrollAnimationDirective } from './directives/scroll-animation.directive';


const routes : Routes= [
  {path: 'products', component:ProductsComponent},
  {path: 'home', component:HomepageComponent},
  {path: '', component:LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'kitchenware', component:KProductsComponent},
  {path: 'garments', component:GProductsComponent},
  {path: 'beauty', component:BProductComponent},



 


]


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    BProductComponent,
    GProductsComponent,
    KProductsComponent,
    ScrollAnimationDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule, 
    MatCardModule,
    MatIconModule, 
    MatButtonModule, 
    FormsModule,
    MatInputModule,
    MatFormFieldModule, 
    HttpClientModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatListModule,
    MatSidenavModule,
    NgImageSliderModule,
    RouterModule.forRoot(routes),



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
