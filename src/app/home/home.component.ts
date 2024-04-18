import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProducts:undefined | product[]
  getProducts:undefined | product[]
  constructor(private product: ProductService){}
  ngOnInit(){
    this.product.popularProducts().subscribe((result)=>{
      if (Array.isArray(result)) {
        this.popularProducts = result; // Assign the array of products
      } 

    }) 
    this.product.getProducts().subscribe((result)=>{
      if (Array.isArray(result)) {
        this.getProducts = result; // Assign the array of products
      } 
    }) 
  }
}
