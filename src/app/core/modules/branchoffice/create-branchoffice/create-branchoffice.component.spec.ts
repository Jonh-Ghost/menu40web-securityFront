import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBranchofficeComponent } from './create-branchoffice.component';

describe('CreateBranchofficeComponent', () => {
  let component: CreateBranchofficeComponent;
  let fixture: ComponentFixture<CreateBranchofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBranchofficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBranchofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
