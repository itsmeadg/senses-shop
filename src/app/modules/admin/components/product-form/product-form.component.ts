import { Product } from './../../../shop/models/product.model';
import { take } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { CategoryService } from "../../../shop/services/category.service";
import { ProductService } from "../../../shop/services/product.service";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"]
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product;
  form: FormGroup;
  id: string;
  detail: string;


  genders = [
    { value: "Female", viewValue: "Female" },
    { value: "Male", viewValue: "Male" },
    { value: "Unisex", viewValue: "Unisex" },
    { value: "None", viewValue: "None" }
  ];

  constructor(
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {

    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get("id");

    if (this.id) {
      // console.log(this.id);
      this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe(product => {
          this.product = product;
        });
    }

    this.form = fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      category: ["", Validators.required],
      gender: [""],
      sku: ["", Validators.required],
      price: ["", Validators.required],
      image: ["", Validators.required],
      details: [""],
      materials: [""],
      care: [""],
      description: ["", Validators.required]
    });
  }

  pushValue(event: any, type: string) {
    if (event.target.value) this.product[type].push(event.target.value);
    this.form.patchValue({ [type]: '' })
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product).then(
        () => this.router.navigate(["/admin/products"])
      );
    } else {
      this.productService.create(product).then(
        () => this.router.navigate(["/admin/products"])
      );
    }

  }

  delete(product) {
    if (!confirm("Are you sure you want to delete " + product.name)) return;
    this.productService.delete(this.id);
    this.router.navigate(["/admin/products"]);
  }

  ngOnInit() { }
}
