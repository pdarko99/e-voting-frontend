import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Ilogin } from '../interface';
import  {anim} from '../../shared/animations'

const trigge = anim()




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations:[ 
    trigge
  ]
})
export class LoginComponent implements OnInit {
  @ViewChild(NgForm) registerForm: NgForm | undefined
  errormsg!: string
  show = false
  get isValid(): boolean{
    return this.registerForm?.valid ? true : false
  }

  userCredentials: Ilogin = {
    email: '',
    password: ''
  }
  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

 loginUser(): void{
    if(this.isValid){
      this.show = true
      this.authservice.loginUser(this.userCredentials).subscribe(
        res => {
          localStorage.setItem('token', JSON.stringify(res.token));
          localStorage.setItem('fullname', JSON.stringify(res.fullname));
          this.router.navigate(['dashboard'])

        },
        err => {
          this.errormsg = err;
          this.show = false;
        },
        () => {
          this.show = false;
        }
      )
    }
  }
  

}
