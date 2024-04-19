import { Component, OnInit} from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  constructor(private product:ProductService){}
  orderPrice:number|undefined
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

        this.orderPrice = price + (price/10) + 100 - (price/10)
      }
    })
  }
  orderForm(data:{email:string,address:string,contact:string}){
    console.log(data);
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id;
    if(this.orderPrice){
      let dataOrder = {
        ...data,
        userId:userId,
        totalPrice:this.orderPrice,
        id:undefined
      }
    
      this.product.orderNow(dataOrder).subscribe((result)=>{
        alert("order submitted");
      })
    }
    
  }
}
