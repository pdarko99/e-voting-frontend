import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headder',
  templateUrl: './headder.component.html',
  styleUrls: ['./headder.component.css']
})
export class HeadderComponent implements OnInit {
  display = 'none'
  none = 'none'
   userInfo = JSON.parse(localStorage.getItem('fullname')!);

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openMenu(){
    if(this.display === 'block'){
      this.display = 'none'

    }else{
      this.display = 'block'
    }
    
  }

  settings(){
    this.display = 'none'
    this.router.navigate(['about'])
  }

  logout(){
    this.display = 'none';
    localStorage.clear()
    this.router.navigate(['login'])
  }

  

}
