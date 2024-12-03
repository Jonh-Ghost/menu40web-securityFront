import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BranchofficeModel } from '../../models/branchoffice.model';
import { BranchofficeFilter } from '../../models/filter/branchoffice.filter';
import { BranchofficeService } from '../../services/branchoffice/branchoffice.service';

@Component({
  selector: 'app-branchoffice',
  templateUrl: './branchoffice.component.html',
  styleUrls: ['./branchoffice.component.scss']
})
export class BranchofficeComponent implements OnInit {

  @Input() isUpdate = false;
  @Input() branchofficeData?: BranchofficeModel;

  displayedColumns: string[] = ['id', 'name', 'nameManager', 'address', 'phone', 'active', 'botones'];

  dataSource = new MatTableDataSource<BranchofficeModel[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  name?: string;
  nameManager?: string;
  address?: string;
  phone?: number;
  email?: string;
  id?: number;
  active?: number;
  idBusiness = 0;
  branchofficeFormFilter?: FormGroup;
  branchofficeModel?: BranchofficeModel;
  branchofficeFilter!: BranchofficeFilter;
  branchoffice: Array<BranchofficeModel> = new Array<BranchofficeModel>();

  branchofficeForm?: FormGroup;

  constructor(
    private title: Title,
    private branchofficeService: BranchofficeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  /**
   * Inicializa el componente ejecutando las fucniones necesarias
   */
   ngOnInit(): void {
    this.title.setTitle('Lista de sucursales | App');
    this.route.params.subscribe((params: Params) => {

      this.idBusiness = params['idBusiness'];

      this.branchofficeFilter = { idBusiness: this.idBusiness }
      console.log("id del bussiness " + this.idBusiness);
      this.search();
    });
  }

  

  buildFormBranchoffice() {
    this.branchofficeForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      nameManager: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      active: ['', Validators.compose([Validators.required])]
    });
    if (this.isUpdate) {
        this.setDataBranchoffice(this.branchofficeData!);
    }
  }

          /**
   * Cuando es actualizar, contruye el Reactive Form con datos que
   * provienen del componente padre
   * @param branchofficeModel
   */
           setDataBranchoffice(branchofficeModel: BranchofficeModel): void{
            this.branchofficeForm?.get('name')?.setValue(branchofficeModel.name);
            this.branchofficeForm?.get('nameManager')?.setValue(branchofficeModel.nameManager);
            this.branchofficeForm?.get('address')?.setValue(branchofficeModel.address);
            this.branchofficeForm?.get('phone')?.setValue(branchofficeModel.phone);
            this.branchofficeForm?.get('email')?.setValue(branchofficeModel.email);
            this.branchofficeForm?.get('active')?.setValue(branchofficeModel.active);
            this.branchofficeForm?.updateValueAndValidity();
          }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //this.paginator.
  }


  /**
   * Invoca el servicio de eliminar sucursales
   * @param branchofficeModel 
   */

  delete(branchofficeModel: BranchofficeModel): void {
    let id = branchofficeModel.id ? branchofficeModel.id : 0; 
    if (confirm(`Esta seguro de eliminar la sucursal ${branchofficeModel.name}?`)) {
      this.branchofficeService.delete(id).subscribe(() => {
        console.log(`El negocio ${branchofficeModel.id} fue eliminado`);
        this.search();
      });
    }
  }

  /**
   * Invoca el servicio de buscar sucursales
   */

  search(): void {
    console.log(`[FILTRAR] Recibiendo datos del formulario ${JSON.stringify(this.branchofficeFilter)}`);
    this.branchofficeService.getByFilter(this.branchofficeFilter).subscribe((data: any) => {
      console.log(this.branchofficeFilter);
      console.log(data);
      if (data && data.data) {
        this.branchoffice = data.data;
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.data = data.data;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  onSubmit(branchofficeFilter: BranchofficeFilter): void{
    this.branchofficeFilter = branchofficeFilter;
    this.search();
  }

  changePagination(event: any): void {
    console.log(event);
  }
  
}