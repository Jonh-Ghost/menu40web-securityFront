import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProductFilter } from 'src/app/core/models/filter/product.filter';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from 'src/app/core/services/product/product.service';
import { ProductModel } from 'src/app/core/models/product.model';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Component({
  selector: 'app-menuProduct',
  templateUrl: './menuProduct.component.html',
  styleUrls: ['./menuProduct.component.scss']
})
export class MenuProductComponent implements OnInit {

  productFilterF!: ProductFilter;
  productFilterF1!: ProductFilter;
  idBusiness = 0;
  idType = 0;
  productList: any[]=[];
  myProductList: any[]=[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {

      //recupero datos de la URL
      this.idBusiness = params['idBusiness'];
      this.idType = params['typeMenu.id'];

      //asigno datos
      this.productFilterF = { idBusiness: this.idBusiness, typeProduct: this.idType, status: 5 }
      this.productFilterF1 = { idBusiness: this.idBusiness, typeProduct: this.idType, status: 5 }
      
      //llamo metodo
      this.searchProducts();
      this.serachMenuProducts();

    })
  }

  /*Invoca servicio para consultar productos del negocio y del mismo tipo que menú*/
  searchProducts(): void {
    console.log(`[FILTRAR] Recibiendo datos del business ${JSON.stringify(this.productFilterF)}`);
    this.productService.getByFilter(this.productFilterF).subscribe((data: any) => {

      console.log(this.productFilterF);
      console.log(data);

      this.productList = data.data;
    })
  }

  /*Invoca servicio para consultar productos del negocio y del menú (Beta)*/
  serachMenuProducts(): void  {
    console.log(`[FILTRAR] Recibiendo datos del business ${JSON.stringify(this.productFilterF1)}`);
    this.productService.getByFilter(this.productFilterF1).subscribe((data: any) => {

      console.log(this.productFilterF1);
      console.log(data);

      this.myProductList = data.data;
        
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
