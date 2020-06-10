import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  categories$;
  @Input('criteria') criteria;
  genders: String[] = ['Male', 'Female', 'Unisex'];
  prices: Object[] = [
    { type: "price", name: "€0 - €25", startPrice: 0, endPrice: 25 },
    { type: "price", name: "€25 - €50", startPrice: 25, endPrice: 50 },
    { type: "price", name: "€50 - €75", startPrice: 50, endPrice: 75 },
    { type: "price", name: "€75 - €100", startPrice: 75, endPrice: 100 }
  ]

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.getAll();
  }

  productFilter(filter) {
    console.log(filter);
    let querySettings = {};
    switch (filter.type) {
      case 'category':
        querySettings['category'] = filter.name;
        break;
      case 'gender':
        querySettings['gender'] = filter.name;
      case 'price':
        querySettings['startPrice'] = filter.startPrice;
        querySettings['endPrice'] = filter.endPrice;
    }
    this.router.navigate(['/shop'], {
      relativeTo: this.route,
      queryParams: querySettings,
      queryParamsHandling: 'merge',
      //  skipLocationChange: true
    });
  }

  removeFilter(filter: string) {
    delete this.criteria[filter];
    this.router.navigate(['/shop'], { queryParams: { ...this.criteria } });
  }
}

