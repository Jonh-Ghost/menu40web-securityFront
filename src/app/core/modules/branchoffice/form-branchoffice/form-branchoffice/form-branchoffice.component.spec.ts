import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBranchofficeComponent } from './form-branchoffice.component';

describe('FormBranchofficeComponent', () => {
  let component: FormBranchofficeComponent;
  let fixture: ComponentFixture<FormBranchofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBranchofficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBranchofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
