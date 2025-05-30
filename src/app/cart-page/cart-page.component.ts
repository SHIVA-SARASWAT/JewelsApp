import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, usercartProductSum } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  userCartProduct: cart[] | undefined;
  userCartProductSummary: usercartProductSum = {
    Amount: 0,
    Tax: 0,
    Delivery: 0,
    Discount: 0,
    Total: 0
  }
  constructor(private product: ProductService, private route: Router) {

  }
  ngOnInit() {
    this.reloadCart();

  }
  reloadCart() {
    this.product.userCartList().subscribe((result) => {
      let price = 0;
      let itemPriceWithQuantity = 0;
      if (result) {
        this.userCartProduct = result;
        result.forEach((items) => {
          const itemPrice = parseFloat(items.price);
          if (items.quantity) {
            itemPriceWithQuantity = (itemPrice) * (items.quantity)
          }

          price = price + itemPriceWithQuantity
        })
        this.userCartProductSummary.Amount = price
        this.userCartProductSummary.Tax = price / 10,
          this.userCartProductSummary.Delivery = 100,
          this.userCartProductSummary.Discount = price / 10,
          this.userCartProductSummary.Total = price + (price / 10) + 100 - (price / 10)
        let user = localStorage.getItem('user');
        let localCart = localStorage.getItem('localcart')
        if (user) {
          if (this.userCartProduct?.length === 0) {
            this.route.navigate(['/'])
          }
        }
        if (localCart) {
          if (this.userCartProduct?.length === 0) {
            this.route.navigate(['/'])
          }
        }

      }
    })



  }
  removeToCart(id: string | undefined) {
    this.product.removeToCart(id).subscribe((response) => {
      this.reloadCart();

    })
  }
}
