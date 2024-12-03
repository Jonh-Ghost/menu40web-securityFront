import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product/product.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductModel } from 'src/app/core/models/product.model';
import { environment } from 'src/environments/environment';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { BusinessService } from 'src/app/core/services/business/business.service';
import { CatTypeMenuProductService } from 'src/app/core/services/cat-type-menu-product/cat-type-menu-product.service';
import { BaseCatModel } from 'src/app/core/models/base-cat.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  titleForm='Registrar nuevo documento';
  idBusiness = 0;
  idMenu = 0;
  productModel?: ProductModel;
  typesProduct: Array<BaseCatModel> = [];

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private businessServices: BusinessService,
    private productServices: ProductService,
    private router: Router,
    private catTypeMenuProductService: CatTypeMenuProductService
  ) { }

  ngOnInit(): void {

    this.title.setTitle(`${this.titleForm} ${environment.page.suffix}`);
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      console.log(localStorage.getItem('ID_LOGGING'));
      this.idBusiness = Number(sessionStorage.getItem('ID_LOGGING'));
      console.log("ID: "+this.idBusiness);
      this.businessServices.get(this.idBusiness).subscribe((data: any) => {
        console.log(data);
        if(data && data.data){
          this.productModel = data.data;
        }
      });
    });

    this.catTypeMenuProductService.getByFilter().subscribe(typesProductResponse => {
      this.typesProduct = typesProductResponse.data;
      console.log(this.typesProduct);
    }, error => {
      this.typesProduct = [];
    });
  }

  /**
   * Recibe datos del evento del componente hijo (formulario)
   * para invocar el servicio de registrar usuario DE UN NUEVO DOCUMENTO
   * @param productModel
   */
   save(productModel: ProductModel) {
    productModel.idBusiness = {id: this.idBusiness};
    console.log('ID DEL USUARIO::::::::'+ sessionStorage.getItem('ID_LOGGING'));
    console.log(`[REGISTRO] Recibiendo datos del fomrulario ${JSON.stringify(productModel)}`);
    this.productServices.create(productModel).subscribe((data) => {
      console.log(data);
      //this.router.navigate(['console/business/' + this.idBusiness + '/product']);
      this.router.navigate(['/owner/product']);
    });
  }

}
