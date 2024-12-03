import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductFilterComponent } from './form-product-filter.component';

describe('FormProductFilterComponent', () => {
  let component: FormProductFilterComponent;
  let fixture: ComponentFixture<FormProductFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProductFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
