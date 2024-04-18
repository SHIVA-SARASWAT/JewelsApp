import { Component } from '@angular/core';
import { dataType, loginDataType } from '../data-type';
import { Router } from '@angular/router';
import { SellerServiceService } from '../services/seller-service.service';
import { flatMap } from 'rxjs';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent {
  constructor(private router:Router, private seller:SellerServiceService){

  }
  loginError:string= ''; 
  showSignUpLogin:boolean = false
  signUp(sellerValue:dataType){
    this.seller.userSignUp(sellerValue)
  }
  // loggin API Calling here
  login(sellerValue:dataType){
    // console.warn(sellerValue);
    this.loginError = ""
    this.seller.userLogin(sellerValue);
    this.seller.isLoggedInError.subscribe((isError)=>{
      if(isError){
        this.loginError = 'Login Crendentials are not correct!!'
      }
    })
    }

  openLogin(){
    this.showSignUpLogin = true
  }
  openSignup(){
    this.showSignUpLogin = false
  }
}
