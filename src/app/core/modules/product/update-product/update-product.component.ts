import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductModel } from 'src/app/core/models/product.model';
import { BusinessService } from 'src/app/core/services/business/business.service';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  titleForm = 'Actualizar producto';
  productModel?: ProductModel;
  idProduct = 0;
  idBusiness = 0;


  constructor(
    private title:Title,
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private productService: ProductService,
    private router: Router
  ) { }

  /**
   * Inicializa el formulario
   */
  ngOnInit(): void {
    this.title.setTitle(`${this.titleForm} | Menu 4.0`);

    this.route.params.subscribe((params: Params) => {

      this.idBusiness = Number(params['idBusiness']);

      this.businessService.get(this.idBusiness).subscribe((data: any) => {
        console.log(data);
        if(data && data.data){
          this.productModel = data.data;
        }
      });

    })

    this.route.params.subscribe((params: Params) => {
      this.idProduct = params['id'];
      this.productService.get(this.idProduct).subscribe((data: any) => {
        console.log(data);
        if(data && data.data){
          this.productModel = data.data;
        }
      });
    });
  }

  /**
   * Recibe datos del evento del componente hijo (formulario)
   * para invocar el servicio de actualizar usuario
   * @param productModel
   */
  save(productModel: ProductModel){
    console.log(`[ACTUALIZAR] Recibiendo datos del formulario ${JSON.stringify(productModel)}`);
    this.productService.update(this.idProduct, productModel).subscribe((data) => {
      console.log(data);
      this.router.navigate(['console/business/' + this.idBusiness + '/product']);
    })

  }

}
