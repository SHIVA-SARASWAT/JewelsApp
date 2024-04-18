import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart } from '../data-type';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  userCartProduct:cart[] | undefined;
  constructor(private product:ProductService){

  }
  ngOnInit(){
    this.reloadCart();

  }
  reloadCart(){
    this.product.userCartList().subscribe((result)=>{
      if(result){
        this.userCartProduct = result;
        console.log(result);
        
      }
    })
  }
}
