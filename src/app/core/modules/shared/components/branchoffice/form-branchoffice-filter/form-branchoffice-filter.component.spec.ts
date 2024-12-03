import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBranchofficeFilterComponent } from './form-branchoffice-filter.component';

describe('FormBranchofficeFilterComponent', () => {
  let component: FormBranchofficeFilterComponent;
  let fixture: ComponentFixture<FormBranchofficeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBranchofficeFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBranchofficeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
