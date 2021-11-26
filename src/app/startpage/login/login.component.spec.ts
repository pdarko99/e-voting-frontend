import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthservice: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthservice = jasmine.createSpyObj(['loginUser'])
    mockRouter = jasmine.createSpyObj(['navigate'])
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [FormsModule],
      providers: [
        {provide: AuthService, useValue: mockAuthservice},
        {provide: Router, useValue: mockRouter}
      ],
      schemas: [NO_ERRORS_SCHEMA]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 it('should call the login user from the auth service when the loginUser is called', () => {
  mockAuthservice.loginUser.and.returnValue(of(true))
  // component.userCredentials.email = "info@gmail.com",
  // component.userCredentials.password = "";

  fixture.detectChanges()

  if (component.isValid){
    console.log('is valid yessssssssss')
  }
  component.loginUser()
    console.log(component.registerForm?.valid)

    expect(mockAuthservice.loginUser).toHaveBeenCalled() 


 })
});
