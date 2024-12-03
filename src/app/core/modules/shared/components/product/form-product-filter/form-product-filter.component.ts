import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductFilter } from 'src/app/core/models/filter/product.filter';

@Component({
  selector: 'app-form-product-filter',
  templateUrl: './form-product-filter.component.html',
  styleUrls: ['./form-product-filter.component.scss']
})
export class FormProductFilterComponent implements OnInit {

  @Output() ngProductDataFilter = new EventEmitter<ProductFilter>();
  productFormFilter?: FormGroup;
  productFilter!: ProductFilter;
  isSubmit = false;
  idBusiness = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {

      this.idBusiness = params['idBusiness'];
      this.productFilter = { idBusiness: this.idBusiness }
      console.log("id del bussiness " + this.idBusiness);

      this.buildFormProductFilter();
    });
  }

  buildFormProductFilter(): void{
    this.productFormFilter = this.formBuilder.group({
      idBusiness: [this.idBusiness],
      name: [''],
      speciality: [''],
      price: [''],
      status: [''],
      type: [''],
    })
  }
/**
 * función que envia los datos del formulario al componente padre
 */
  onSubmit(): void{
    console.log(this.productFormFilter?.valid);
    console.log(this.productFormFilter?.value);
    this.isSubmit = true;
    this.ngProductDataFilter.emit(this.productFormFilter?.value);
  }
}
