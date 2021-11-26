import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { OrgService } from '../org.service';
import  {anim} from '../../shared/animations'

const trigge = anim()

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css'],
  animations: [
    trigge
  ]
})
export class InterfaceComponent implements OnInit {

  constructor(private router: Router, private orgservice: OrgService) { }
  display = "none"
  getAllOrg$ = this.orgservice.getAllOrg().pipe(
    map(x => x.allorg),
    tap(x => console.log(x))
    // map(x => x.pic = 'http://localhost:3000' + x.pic)
  )
  ngOnInit(): void {
  }

  launchdemo(): void{
    this.display = "block"
  }

  

}
