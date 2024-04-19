import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit{
  orderItems:order[] | undefined
constructor(private product:ProductService){

}

ngOnInit(){
  this.getOrderItem();
}
getOrderItem(){
  this.product.getOrderItems().subscribe((result)=>{
    this.orderItems = result;
    console.log(result);
    
  })
}
cancelOrder(orderId:string| undefined){
  this.product.cancelOrder(orderId).subscribe((response)=>{
    this.getOrderItem()
  })
}


}
