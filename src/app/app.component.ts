import { Component, OnInit } from '@angular/core';
import { SellerServiceService } from './services/seller-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EcartApp';
  constructor(private seller:SellerServiceService){

  }
  ngOnInit(){
    this.seller.reloadSeller()
    
  }
}
