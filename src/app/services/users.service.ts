import { EventEmitter, Injectable } from '@angular/core';
import { dataType, loginDataType, product } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isloginError = new EventEmitter<boolean>(false);
  constructor(private http:HttpClient, private route:Router) { 

  }

  userSignUp(userDetail:dataType){
    this.http.post("http://localhost:3000/users",userDetail,{observe:'response'}).subscribe((result)=>{
      localStorage.setItem('user',JSON.stringify(result.body));
      this.route.navigate(['/']);
    })
  }
  reloadAuth(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/']);
    }
  }
  userLogin(userDetail:dataType){
    this.http.get<dataType[]>(`http://localhost:3000/users?email=${userDetail.email}&&password=${userDetail.password}`,{observe:'response'}).subscribe((result)=>{
      if(result && result.body && result.body.length){
        // console.log(result.body);

        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.route.navigate(['/']);
        this.isloginError.emit(false);
      }
      else{
        this.isloginError.emit(true);
      }
    })
  }

  

}
