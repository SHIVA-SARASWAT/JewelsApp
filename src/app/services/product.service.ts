import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartProductNumber = new EventEmitter<product[] | []>();
  cartProductNumberAfterLogin = new EventEmitter<number>();
  constructor(private http: HttpClient) { }
  addProduct(data: product) {
    this.http.post('http://localhost:3000/products', data).subscribe((result) => {
      console.log("successfully posted");

    })
  }
  getProducts() {
    return this.http.get<product>("http://localhost:3000/products")
  }
  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getProductId(id: string) {

    return this.http.get<product>(`http://localhost:3000/products/${id}`)

  }
  updateProduct(data: product) {
    return this.http.put<product>(`http://localhost:3000/products/${data.id}`, data)
  }
  popularProducts() {
    return this.http.get<product>("http://localhost:3000/products?_limit=3")
  }
  deleteProductFromCart(userId: string) {
    console.log(userId);

    return this.http.delete(`http://localhost:3000/cart/${userId}`)

  }
  queryProducts(query: string) {
    return this.http.get<product>(`http://localhost:3000/products?category=${query}`)
  }
  userAddToCart(data: product) {
    let cartData = []
    let localCartData = localStorage.getItem('localCart')
    if (!localCartData) {
      localStorage.setItem('localCart', JSON.stringify([data]))
      this.cartProductNumber.emit([data])
      // console.log(this.cartProductNumber);

    }
    else {
      cartData = JSON.parse(localCartData);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartProductNumber.emit(cartData);
  }
  removeCart(productDetailId: string) {

    let items = localStorage.getItem('localCart');

    if (items) {
      let item: product[] = JSON.parse(items);
      // console.log(item);

      let itemDetail = item.filter((product) => productDetailId !== product.id);


      console.log(itemDetail);

      localStorage.setItem('localCart', JSON.stringify(itemDetail))
      // console.log(item);
      this.cartProductNumber.emit(itemDetail);

    }
    else if (localStorage.getItem('user')) {
      let user = localStorage.getItem('user')
      if (user) {
        // let userId = JSON.parse(user).id;
        this.deleteProductFromCart(productDetailId);
      }
    }

  }
  removeToCart(id: string) {
    return this.http.delete("http://localhost:3000/cart/" + id)
  }
  addToCart(cartData: cart) {
    return this.http.post("http://localhost:3000/cart", cartData)
  }
  getCartProductsById(userId: string) {
    // console.log(userId);

    return this.http.get<product>(`http://localhost:3000/cart?userId=${userId}`)
  }
  checkCartProductAfterLogin() {
    let user = localStorage.getItem('user');
    if (user) {
      let userId = JSON.parse(user).id;
      this.getCartProductsById(userId).subscribe((result) => {
        if (Array.isArray(result)) {
          console.log(result);

          let cartItemNumber = result.length
          this.cartProductNumberAfterLogin.emit(cartItemNumber)
        }
      })

    }
  }
  getCartList(userId: string) {
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=${userId}`, { observe: 'response' }).subscribe((result) => {
      if (result && result.body) {
        this.cartProductNumber.emit(result.body)
      }
    })
  }
}
