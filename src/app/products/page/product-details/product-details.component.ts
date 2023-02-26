import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productId: number = -1;

  isEditable: boolean = true;

  productFormGroup!: FormGroup;

  constructor(
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.productId = parseInt(this._activatedRoute.snapshot.params['id'] || '0');
  }

  cancelProductForm(): void {
    this.isEditable = false;
  }
}