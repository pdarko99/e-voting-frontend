import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrgService } from '../org.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  show = false;
  @ViewChild(NgForm) registerForm: NgForm | undefined
  errormsg!: string

  
  org = {
    name: '',
    Image: '',
    description: '',
    pic: '',
  }
  constructor(private orgservice: OrgService, private router: Router) { }

  ngOnInit(): void {
  }
  selectImage(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.org.Image = file
    }
  }

  createOrg(): void{
    // console.log(this.org)
    // console.log(this.registerForm?.value)
    const formdata = new FormData()
    formdata.append('Image', this.org.Image)
    formdata.append('name', this.org.name)
    formdata.append('description', this.org.description)
    formdata.append('pic', 'heool')
    this.orgservice.createOrg(formdata).subscribe(
      res => {this.router.navigate(['dashboard'])},
      err => console.log(err)
    )
  }

}
