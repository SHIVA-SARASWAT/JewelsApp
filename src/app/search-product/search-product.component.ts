import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }

  searchProductResult: undefined | product[];

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const query = params.get('query');
      this.search(query ?? '');
    });
  }

  search(query: string) {
    if (query) {
      this.productService.queryProducts(query).subscribe((result) => {
        if (Array.isArray(result)) {
          this.searchProductResult = result;
        }
      });
    }
  }
}
