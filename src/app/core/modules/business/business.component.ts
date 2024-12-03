import {AfterViewInit, Component, ViewChild, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { BusinessModel } from 'src/app/core/models/business.model';
import { BusinessService } from '../../services/business/business.service';
import { environment } from 'src/environments/environment';
import { ResponseListModel } from '../../models/response/response-list.model';
import { BusinessFilter } from '../../models/filter/business.filter';
import { MetadataModel } from '../../models/response/response.-object.model';
import { UiService } from '../../services/ui/ui.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  displayedColumns: string[] = ['id', 'name', 'typeBusiness', 'botones'];
  dataSource = new MatTableDataSource<BusinessModel>();
  businessFilter!: BusinessFilter;

  name?: string;
  typeBusiness?: number;
  id?: number;
  business: Array<BusinessModel> = new Array<BusinessModel>();
  metadata!: MetadataModel;

  constructor(
    private title: Title,
    private businessService: BusinessService,
    private uiService: UiService
  ) { }

  /**
   * Inicializa el componente ejecutando las fucniones necesarias
   */
   ngOnInit(): void {
    this.title.setTitle('Lista de negocios | App');
    this.businessFilter = {size: environment.paginator.size, page: 0};
    this.serach();
  }

  ngAfterViewInit() {
    this.paginator.showFirstLastButtons = environment.paginator.showFirstLastButtons;
    this.dataSource.paginator = this.paginator;
  }


  /**
   * Invoca el servicio de eliminar business
   * @param businessModel 
   */
  delete(businessModel: BusinessModel): void {
    let id = businessModel.id ? businessModel.id : 0; 
    if (confirm(`Esta seguro de eliminar al usuario ${businessModel.name}?`)) {
      this.businessService.delete(id).subscribe(() => {
        console.log(`El negocio ${businessModel.id} fue eliminado`);
        this.serach();
      });
    }
  }

  /**
   * Invoca el servicio de buscar usuarios
   */
  serach(): void {
    this.businessService.getByFilter(this.businessFilter).subscribe((responseListModel: ResponseListModel<BusinessModel>) => {
      console.log(responseListModel);
      if (responseListModel && responseListModel.data) {
        this.metadata = responseListModel.metadata;
        //this.paginator.length = this.metadata.pagination.total;
        this.dataSource.data = responseListModel.data;
        //this.dataSource.paginator = this.paginator;
      }
    });
  }


  paginate(pageEvent: PageEvent) {
    console.log(pageEvent);
    this.businessFilter.page = pageEvent.pageIndex;
    this.serach();
  }

}
