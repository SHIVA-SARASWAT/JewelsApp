import { Component,OnInit} from '@angular/core';
import { product } from '../data-type';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit {
  updatePreviousData: undefined | product
  updatedMessage:string =''
  submit(data:product){
    if(this.updatePreviousData){
      data.id = this.updatePreviousData.id
    }
    this.product.updateProduct(data).subscribe((result)=>{
      this.updatedMessage = 'Product Updated Successfully'
      setTimeout(()=>{
        this.updatedMessage = ''
        this.router.navigate(['seller-home'])
      }, 3000)
      

    })
  }
  constructor(private route:ActivatedRoute, private product:ProductService, private router: Router){

  }
  ngOnInit(){
    let productId = this.route.snapshot.paramMap.get('id');    
    productId && this.product.getProductId(productId).subscribe((result)=>{
      this.updatePreviousData = result;
    })
  }

}
