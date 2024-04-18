import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dataType, loginDataType } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerServiceService {
  isLoggedInError = new EventEmitter<boolean>(false)
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router:Router) { }
  userSignUp(data:dataType){
      this.http.post('http://localhost:3000/seller',data, {observe: 'response'}).subscribe((result)=>{
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
    })
  }
  userLogin(data:loginDataType){
    console.log(data);
    
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe: 'response'}).subscribe((result:any)=>{
      console.log(result);
    if(result && result.body && result.body.length){
      
      
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
    }
    else{
      this.isLoggedInError.emit(true);
    }
    })
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      // this.router.navigate(['seller-home'])
    }
  }
}
