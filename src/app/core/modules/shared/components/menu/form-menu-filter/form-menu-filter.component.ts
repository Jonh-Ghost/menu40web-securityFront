import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuFilter } from 'src/app/core/models/filter/menu.filter';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-form-menu-filter',
  templateUrl: './form-menu-filter.component.html',
  styleUrls: ['./form-menu-filter.component.scss']
})
export class FormMenuFilterComponent implements OnInit {

  @Output() ngMenuDataFilter = new EventEmitter<MenuFilter>();
  menuFormFilter?: FormGroup;
  menuFilter!: MenuFilter;
  isSubmit = false;
  idBranchOffice = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {

      this.idBranchOffice = params['idBranchOffice'];
      this.menuFilter = { idBranchOffice: this.idBranchOffice }
      console.log("id de la sucursal " + this.idBranchOffice);

      this.buildFormMenuFilter();

    });
  }

  buildFormMenuFilter(): void{
    this.menuFormFilter = this.formBuilder.group({
      idBranchOffice: [this.idBranchOffice],
      code: [''],
      status: [''],
      typeMenu: [''],
    })
  }

  onSubmit(): void{
    console.log(this.menuFormFilter?.valid);
    console.log(this.menuFormFilter?.value);
    this.isSubmit = true;
    this.ngMenuDataFilter.emit(this.menuFormFilter?.value);  
  }

}
