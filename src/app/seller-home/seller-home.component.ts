import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { dataType, product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
  addProduct: product[] = []; // Initialize as an empty array
  deleteMessage:string = ''
  icon = faTrash
  editIcon = faEdit
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.listProduct()
  }
  deleteProduct(id:string){
    this.productService.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.deleteMessage = "Message deleted succesfully";
        this.listProduct();
      }
          setTimeout(()=>{
      this.deleteMessage = ''
    },3000)
    })

  }
  listProduct(){
    this.productService.getProducts().subscribe((result) => {
      if (Array.isArray(result)) {
        this.addProduct = result; // Assign the array of products
      } else {
        console.error('Expected array of products but received:', result);
      }
    }, (error) => {
      // Handle error if any
      console.error('Error fetching products:', error);
    });
  }
  
}
