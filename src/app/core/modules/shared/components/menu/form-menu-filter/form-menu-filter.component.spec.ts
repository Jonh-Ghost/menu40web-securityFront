import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMenuFilterComponent } from './form-menu-filter.component';

describe('FormMenuFilterComponent', () => {
  let component: FormMenuFilterComponent;
  let fixture: ComponentFixture<FormMenuFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMenuFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMenuFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
