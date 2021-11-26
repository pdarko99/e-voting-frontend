import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { OrgService } from '../org.service';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.css']
})
export class OrgComponent implements OnInit {
  name: string = this.route.snapshot.params.id;
  allvotersLength!: number
  allcandsLength!: number
  org$ = this.orgservice.getOrg(this.name).pipe(
    map(x => x.findoneOrg)
  )
 
  constructor(private route: ActivatedRoute, private orgservice: OrgService) { }

  ngOnInit(): void {
    this.getVoters().subscribe(
      res => this.allvotersLength = res
    )

    this.getCandidates().subscribe(
      res => this.allcandsLength = res
    )
  }

  getVoters(){
    return this.orgservice.getVoters(this.name).pipe(
      map(x => x.allVoters.length)
      // allCands
    )
  }

  getCandidates(){
    return this.orgservice.getCandidates(this.name).pipe(
      map(x => x.allCands.length)
    )
  
  }

}
