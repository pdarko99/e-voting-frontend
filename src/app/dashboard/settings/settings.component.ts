import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { OrgService } from '../org.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  show = false;
  errorOrConfrimsg!: string
  name: string = this.route.snapshot.params.id;
  settings = {
    name: '',
    description: '',
    startdate: '',
    starttime: '',
    endtime: '',
    image: '',
  }

  selectImage(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.settings.image = file
    }
  }
  constructor(private route: ActivatedRoute, private orgservice: OrgService, private router: Router) { }

  ngOnInit(): void {
    this.orgservice.getOrg(this.name).pipe(
      map(x => x.findoneOrg)
    ).subscribe(
      res => {
        console.log(res)
        this.format(res)
      }
    )
  }

  Submit(){
    this.show = true;

    const formdata = new FormData()
    formdata.append('Image', this.settings.image)
    formdata.append('name', this.settings.name)
    formdata.append('description', this.settings.description)
    formdata.append('startdate', this.settings.startdate)
    formdata.append('starttime', this.settings.starttime)
    formdata.append('endtime', this.settings.endtime)

    this.orgservice.updateOrg(this.name, formdata).subscribe(
      res => this.show = false
    )
  }

  format(res: any): void{
    this.settings.name = res.name;
    this.settings.description = res.description
    this.settings.startdate = res.startdate
    this.settings.starttime = res.starttime
    this.settings.endtime = res.endtime
  }

  deleteOrg(){
    this.orgservice.deleteOrg(this.name).subscribe(
      res => {
        console.log(res)
        this.router.navigate(['dashboard'])
      },
      err => {
        this.errorOrConfrimsg = 'couldnt delete'
      }
    )
  }

}
