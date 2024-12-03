import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/core/models/product.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FileModel } from 'src/app/core/models/file.model';
import { BaseCatModel } from 'src/app/core/models/base-cat.model';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
  @Input() titleForm = '';
  @Input() isUpdate = false;
  @Input() productData?: ProductModel;
  @Input() typesProduct?: Array<BaseCatModel>;
  @Output() ngProductData = new EventEmitter<ProductModel>();
  productForm?: FormGroup;
  isSubmit = false;
  imagePreview: Array<string> = [];
  imageProducts: Array<FileModel> = [];

  @ViewChild('inputImage') inputElement!: ElementRef<HTMLInputElement>;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.buildFormProduct();
    if (this.isUpdate) {
      console.log('Form Update');
      console.log(this.productData);
      this.setDataToUpdate(this.productData!);
    }
  }

  /**
   * Construye el Reactive Form angular
   */
  buildFormProduct(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      speciality: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      status: ['', Validators.compose([Validators.required])],
      type: ['', Validators.compose([Validators.required])],
      files: [[], []],
    });
  }

  /**
   * Cuando es actualizar, contruye el Reactive Form con datos que
   * provienen del componente padre
   * @param productModel
   */
  setDataToUpdate(productModel: ProductModel): void {
    this.productForm?.get('name')?.setValue(productModel.name);
    this.productForm?.get('speciality')?.setValue(productModel.speciality);
    this.productForm?.get('description')?.setValue(productModel.description);
    this.productForm?.get('price')?.setValue(productModel.price);
    this.productForm?.get('status')?.setValue(productModel.status);
    this.productForm?.get('typeProduct')?.setValue(productModel.speciality);
    this.productForm?.get('files')?.setValue(productModel.files);
    console.log('AQUI ES LA RUTA DEL ARCHIVO:::::::::::::::::::::' + productModel.files);
    this.productForm?.updateValueAndValidity();
  }

  /**
   * Cuando la información del formulario es correcta emite un evento
   * con los datos del formulario
   */
  onSubmit(): void {
    console.log(this.productForm?.valid);
    console.log(this.productForm?.value);
    this.isSubmit = true;
    if (this.productForm?.value) {

      let type = this.typesProduct?.find(item => item.id == this.productForm?.value.type);

      const product: ProductModel = {
        name: this.productForm.value.name,
        speciality: this.productForm.value.speciality,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
        urlImage: this.productForm.value.urlImage,
        status: this.productForm.value.status,
        typeProduct: this.productForm.value.speciality,
        files: this.productForm.value.files
      }
      this.ngProductData.emit(product);
    }
  }


  onRemoveImage(i: any) {
    this.imagePreview.splice(i, 1);
    this.imageProducts.splice(i, 1);
    this.inputElement.nativeElement.value = '';
  }

  onImageSelected(event: any) {
    console.log(this.productForm?.get('name')?.value);

    if (event?.target?.files) {
      const files: Array<File> = event.target.files;
      Array.from(files).forEach((file, index) => {
        var reader = new FileReader();
        reader.onload = (e: any) => {
          const imageProduct = {
            mimeType: file.type,
            base: e.target.result
          }

          this.imageProducts.push(imageProduct);
          this.imagePreview.push(e.target.result);

          if (index == (files.length - 1)) {
            this.productForm?.controls['files'].setValue(this.imageProducts);
            this.productForm?.updateValueAndValidity();
          }
        }
        reader.readAsDataURL(file);

      });
      console.log(this.productForm?.value);
    } else {
      console.log("Error en peso de imagen")
    }

  }

}
