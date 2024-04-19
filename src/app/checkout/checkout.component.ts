import { Component, OnInit} from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { cart } from '../data-type';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  constructor(private product:ProductService, private route:Router){}
  orderPrice:number|undefined
  cartData:cart[] | undefined
  ngOnInit(){
    this.product.userCartList().subscribe((result)=>{
      let price = 0;
      let itemPriceWithQuantity = 0;
      if(result){
        result.forEach((items)=>{
            const itemPrice = parseFloat(items.price); 
             if(items.quantity){
               itemPriceWithQuantity = (itemPrice)*(items.quantity)
             }
        
        price = price + itemPriceWithQuantity
        })
        this.cartData = result;        
        this.orderPrice = price + (price/10) + 100 - (price/10)
      }
    })
  }
  orderNow(data:{email:string,address:string,contact:string}){
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id;
    if(this.orderPrice){
      let dataOrder = {
        ...data,
        userId:userId,
        totalPrice:this.orderPrice,
        id:undefined
      }
      
      this.cartData?.forEach((items)=>{
          setTimeout(()=>{
            if(items && items.id){
              this.product.deleteCartAfterOrder(items.id);
            }
           },700)
      })

      this.product.orderNow(dataOrder).subscribe((result)=>{
        

        setTimeout(()=>{
          alert("order submitted");
        },4000)
        
        
        this.route.navigate(['/my-order']);
      })
    }
    
  }
}
