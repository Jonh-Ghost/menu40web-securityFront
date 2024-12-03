import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormAdmBusinessComponent } from './form-adm-business.component';

describe('FormAdmBusinessComponent', () => {
  let component: FormAdmBusinessComponent;
  let fixture: ComponentFixture<FormAdmBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAdmBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAdmBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

