import { Component,OnInit,ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/core/models/product.model';
import { ProductService } from '../../services/product/product.service';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductFilter } from '../../models/filter/product.filter';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
/**
 * Define el nombre de las columnas en la tabla de productos
 */
  displayedColumns: string[] = ['id', 'name', 'speciality', 'price', 'status', 'type', 'acciones', 'urlImage'];
  dataSource!: MatTableDataSource<any>;
  product: Array <ProductModel> = new Array <ProductModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  productFormFilter?: FormGroup;
  productModel?: ProductModel;
  productFilterF!: ProductFilter;
  idBusiness = 0;


   constructor(
    private title: Title,
     private productService: ProductService,
    private  route: ActivatedRoute,
  ) {}

  /**
   * Inicializa el componente ejecutando las fucniones necesarias
   */
  ngOnInit(): void {
    this.title.setTitle(`Lista de Productos ${environment.page.suffix}`);
    this.route.params.subscribe((params: Params) => {
    this.idBusiness = params['idBusiness'];
    this.productFilterF = { idBusiness: this.idBusiness }
    this.search();
    });
  }

   /**
   * Invoca el servicio de eliminar producto
   * @param productModel
   */


  delete(productModel: ProductModel):void {
    let id = productModel.id ? productModel.id : 0;
    Swal.fire({
      title: "¿Eliminar documento?",
      text: `Deseas eliminar ${productModel.name}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      cancelButtonColor: '#F83131',
      confirmButtonColor: '#31B7FF'
    }).then(result => {
      if(result.isConfirmed){
        this.productService.delete(id).subscribe(() => {
          Swal.fire(
            'Exito al eliminar',
            `Se eliminó ${productModel.name}`,
            'success'
          )
          console.log(`Se eliminó ${productModel.name} `);
          this.search();
        })
      }
    })
  }

  /**
   * Invoca el servicio de buscar productos
   */
  search(): void {
    console.log(`[FILTRAR] Recibiendo datos del formulario ${JSON.stringify(this.productFilterF)}`);
    this.productService.getByFilter(this.productFilterF).subscribe((data: any) => {
      console.log(this.productFilterF);
      console.log(data);
      if (data && data.data) {
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  /**
   * Recibe el evento del formulario y asigna los datos recibidos para
   * posteriormente pintar los resultados
   * @param productFilter
   */
  onSubmit(productFilter: ProductFilter): void{
    this.productFilterF = productFilter;
    this.search();
  }

}
