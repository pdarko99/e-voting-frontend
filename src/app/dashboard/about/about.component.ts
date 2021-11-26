import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/startpage/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  errorOrConfrimsg!: string
  show = false
  update = {
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    oldPassword: ''
  }
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    this.getUser()
  }

  Submit(){
    let data = {
      fullname: this.update.fullname,
      email: this.update.email,
      password: this.update.password
    }
    this.show = true
    if(this.update.password === this.update.confirmPassword){
      if(!this.update.password){
        data.password = this.update.oldPassword
      }
      this.authservice.updateUser(data).subscribe(
        res => this.errorOrConfrimsg = res.message,
        err => this.errorOrConfrimsg = err
      )
    }else{
      this.errorOrConfrimsg = 'passwords dont much'
    }
    this.show = false

  }
  

  getUser(){
    this.authservice.getUser().subscribe(
      res => {
        this.update.email = res.email;
        this.update.fullname = res.fullname;
        this.update.oldPassword = res.password
      },
      err => this.errorOrConfrimsg = err
    )
  }

}
