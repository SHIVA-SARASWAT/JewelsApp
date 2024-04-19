import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  productDetail:undefined | product;
  removeCart:boolean = false;
  productQuantitiy:number= 1;
  cartData:product | undefined
  cartProductNumberAfterLogin = new EventEmitter<number>();
  constructor(private activatedRoute: ActivatedRoute, private product:ProductService, private userService:UsersService){

  }
  ngOnInit(){
    let productId= this.activatedRoute.snapshot.paramMap.get('id');
    console.warn(productId);
    
    this.activatedRoute.paramMap.subscribe((response)=>{
      const element = response.get('id');
      this.product.getProductId(element ?? '').subscribe((result)=>{
        this.productDetail = result;
        let cartData= localStorage.getItem('localCart');
        if(productId && cartData){
          let items = JSON.parse(cartData);
          items = items.filter((item:product)=>productId=== item.id.toString());
          if(items.length){
            this.removeCart=false
          }else{
            this.removeCart=true
          }
        }
        let user = localStorage.getItem('user');
        if(user){
          let userId= user && JSON.parse(user).id;
          this.product.getCartList(userId);
  
          this.product.cartProductNumber.subscribe((result)=>{
            let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
         if(item.length){
          this.cartData=item[0];
          this.removeCart=false;
         }
          })
        }
        
      })
    })
    this.removeCart = true;

  }
  addToCart() {
    if (this.productDetail) {
      this.productDetail.quantity = this.productQuantitiy;
      if (!localStorage.getItem('user')) {
        this.product.userAddToCart(this.productDetail);
        this.removeCart = false;
      } else {
        let data = localStorage.getItem('user');
        let userId = data && JSON.parse(data).id;
        if (userId) {
          let cartData: cart = {
            ...this.productDetail, // Assuming this.productDetail is an array of ProductDetail
            userId: userId, // Assuming userId is a string
            productId: this.productDetail.id // Assuming this.productDetail has an id property
          };
          delete cartData.id;
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              this.product.getCartList(userId);
              this.removeCart = false;
              alert("product add to cart successfully")
            }
            
            
            this.checkCartProduct()
            // console.log(result);
          })
          // Perform further operations with carData if needed
        } else {
          console.error('User ID not found in local storage');
        }
      }
    }
}

  // removeToCart(productDetailId:string){
  //   this.product.removeCart(productDetailId)
  //   console.log(productDetailId);
    
  //   this.removeCart = true;
  // }
  removeToCart(productId:string){
    if(!localStorage.getItem('user')){
this.product.removeCart(productId)
    }else{
      console.warn("cartData", this.cartData);
      
      this.cartData && this.product.removeToCart(this.cartData.id)
      .subscribe((result)=>{
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user).id;
        this.product.getCartList(userId)
      })
    }
    this.removeCart=true
  }

  decreaseProductQuantity(){
    if(this.productQuantitiy>=2){
      this. productQuantitiy = this.productQuantitiy - 1;
    } 

  }
  increaseProductQuantity(){
    this.productQuantitiy = this.productQuantitiy + 1;
  }
  checkCartProduct(){
    this.product.checkCartProductAfterLogin()
  }
}
