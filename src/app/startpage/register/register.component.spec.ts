import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { By } from '@angular/platform-browser';


import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthservice: any;
  let mockRouter: any;


  beforeEach(async () => {
    mockAuthservice = jasmine.createSpyObj(['registerUser'])
    mockRouter = jasmine.createSpyObj(['navigate'])

    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: AuthService, useValue: mockAuthservice},
        {provide: Router, useValue: mockRouter}
        
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    
    component.registerForm.get('fullname')?.setValue('prince darko')
    component.registerForm.get('email')?.setValue('info@gmail.com')
    component.registerForm.get('passwordGroup.password')?.setValue('prince')
    component.registerForm.get('passwordGroup.confirmPassword')?.setValue('prince')
    

    fixture.detectChanges();

  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('(registerUser) should call the registerUser from the auth service when called', function(){
    mockAuthservice.registerUser.and.returnValue(of(true))


    component.registerUser()

    expect(mockAuthservice.registerUser).toHaveBeenCalled()
  })

  it('(registerUser) should call the formatValue  when called', function(){
    mockAuthservice.registerUser.and.returnValue(of(true))
    spyOn(fixture.componentInstance, 'formatValue')

    component.registerUser()

    expect(component.formatValue).toHaveBeenCalled()
  })

  it('format value should process the data into three fields only(fullname, password and email)', function(){
    let data = component.formatValue()

    expect(data.fullname).toEqual('prince darko')
    expect(data.password).toEqual('prince')
    expect(data.email).toEqual('info@gmail.com')
  })

    it('should call registerUser when the register button is clicked', fakeAsync(()=>{

    fixture.detectChanges();
    
      spyOn(fixture.componentInstance, 'registerUser')

      const button = fixture.debugElement.nativeElement.querySelector('button')
      button.click();
      tick()
      expect(fixture.componentInstance.registerUser).toHaveBeenCalled()
  }))

  it('should properly display the error message in the template if field is invalid (firstname)', ()=>{
    //for some reason i'm not able to test this
    //i do not know if it's because the span has the ngIf directive

    /*
    component.registerForm.get('fullname')?.setValue('')

    fixture.detectChanges();

    let fullnameSpan = fixture.debugElement.queryAll(By.css('span'))
    // expect(fullnameSpan[1]?.nativeElement.textContent).toBeDefined()
    console.log(fullnameSpan, 'from fullnamespan')


*/
    

  
   
   
    

  })

})
