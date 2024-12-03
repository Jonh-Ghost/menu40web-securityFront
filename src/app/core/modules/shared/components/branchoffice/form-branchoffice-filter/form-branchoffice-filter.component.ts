import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BranchofficeFilter } from 'src/app/core/models/filter/branchoffice.filter';

@Component({
  selector: 'app-form-branchoffice-filter',
  templateUrl: './form-branchoffice-filter.component.html',
  styleUrls: ['./form-branchoffice-filter.component.scss']
})
export class FormBranchofficeFilterComponent implements OnInit {

  @Output() ngBranchofficeDataFilter = new EventEmitter<BranchofficeFilter>();
  branchofficeFormFilter?: FormGroup;
  branchofficeFilter!: BranchofficeFilter;
  isSubmit = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildFormBranchofficeFilter();
  }

  buildFormBranchofficeFilter(): void{
    this.branchofficeFormFilter = this.formBuilder.group({
      name: [''],
      nameManager: [''],
      phone: [''],
      active: [''],
    })
  }

  onSubmit(): void{
    console.log(this.branchofficeFormFilter?.valid);
    console.log(this.branchofficeFormFilter?.value);
    this.isSubmit = true;
    this.ngBranchofficeDataFilter.emit(this.branchofficeFormFilter?.value);
  }
}
