import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuName: string = 'default'
  sellerName: string = ''
  userName: string = ''
  queryProducts: undefined | product[]
  constructor(private route: Router, private products: ProductService) {

  }
  cartItemNumber = 0
  ngOnInit() {
    this.route.events.subscribe((route: any) => {
      if (route.url) {
        if (localStorage.getItem('seller') && route.url.includes('seller')) {
          this.isMenuName = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        }
        else if (localStorage.getItem('user')) {
          let data = localStorage.getItem('user');
          let dataDetails = data && JSON.parse(data);
          this.userName = dataDetails.name
          this.isMenuName = 'user'
        }
        else {
          this.isMenuName = 'default';
        }
      }
    })
    let cartItem = localStorage.getItem('localCart')
    if (cartItem) {
      this.cartItemNumber = JSON.parse(cartItem).length
    }
    this.products.cartProductNumber.subscribe((items) => {
      this.cartItemNumber = items.length
    })
    this.cartProductsById()
     this.products.cartProductNumberAfterLogin.subscribe((result)=>{
      if(result){
        this.cartItemNumber = result
      }
     })
  }
  sellerLogOut() {
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }
  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(["/"])
    this.products.cartProductNumber.emit([])
  }
  searchProduct(query: KeyboardEvent) {
    // this.products.queryProducts(query).subscribe()
    if (query) {
      const element = query.target as HTMLInputElement
      this.products.queryProducts(element.value).subscribe((result) => {
        if (Array.isArray(result)) {
          // console.log(result);
          if (result.length > 5) {
            result.length = 5
          }
          this.queryProducts = result
        }
      })
    }


  }
  emptySearch() {
    this.queryProducts = undefined
  }
  navigateSearch(id: string) {
    this.route.navigate(['/product-detail/' + id])
  }
  searchProductbar(value: string) {
    this.route.navigate([`/search-product/${value}`])
  }
  cartProductsById() {
    let user = localStorage.getItem('user');
    if (user) {
      let userId = JSON.parse(user).id;
      this.products.getCartProductsById(userId).subscribe((result) => {
        if (Array.isArray(result)) {
          console.log(result);

          this.cartItemNumber = result.length
        }
      })

    }


  }
}
