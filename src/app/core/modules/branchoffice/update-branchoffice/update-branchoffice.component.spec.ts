import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBranchofficeComponent } from './update-branchoffice.component';

describe('UpdateBranchofficeComponent', () => {
  let component: UpdateBranchofficeComponent;
  let fixture: ComponentFixture<UpdateBranchofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBranchofficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBranchofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
