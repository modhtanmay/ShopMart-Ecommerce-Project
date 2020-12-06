import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginJwtComponent } from './login-jwt.component';

describe('LoginJwtComponent', () => {
  let component: LoginJwtComponent;
  let fixture: ComponentFixture<LoginJwtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginJwtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginJwtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
