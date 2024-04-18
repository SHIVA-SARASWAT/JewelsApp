import { Component } from '@angular/core';
import { cart, dataType, loginDataType, product } from '../data-type';
import { UsersService } from '../services/users.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {
  constructor(private userSercice:UsersService,private product:ProductService){}
  showLogin:boolean = true
  authError:string = ''
  ngOnInit(){
    this.userSercice.reloadAuth();
  }
  signUpDetailSubmit(value:dataType){
    this.userSercice.userSignUp(value)
  }
  openSignUp(){
    this.showLogin = false
  }
  openLogin(){
    this.showLogin = true
  }
  login(loginDetails:dataType){
    // console.log(loginDetails);
    this.userSercice.userLogin(loginDetails)
    this.userSercice.isloginError.subscribe((result)=>{
      if(result){
        this.authError = "Please enter valid credentials"
      }
      else{
        this.localCartToRemoteCart()
      }
    })

  }
  localCartToRemoteCart() {
    let localStorageCart = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(localStorageCart){
      let localStorageItem:product[] = JSON.parse(localStorageCart);
      console.warn(localStorageItem);
      localStorageItem.forEach((product:product, index)=>{
        let carData:cart = {
            ...product,
              userId,
              productId:product.id
            }
            delete carData.id;
            setTimeout(()=>{
              this.product.addToCart(carData).subscribe((result)=>{
                console.warn(result);
              })
            },500)
            if(localStorageItem.length === index+1){
              localStorage.removeItem('localCart')
            }
      })


      
    } 
    setTimeout(()=>{
      this.product.getCartList(userId);
    },1000)

  }

}
