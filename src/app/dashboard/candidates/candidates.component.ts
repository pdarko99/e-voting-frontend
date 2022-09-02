import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {  merge, Subject } from 'rxjs';
import { map, scan, tap } from 'rxjs/operators';
import { OrgService } from '../org.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  
  updateFlag = false
  display= 'none'
  private candidatesId!: string
  errorOrConfrimsg!: string
  private addedCandidate = new Subject<any>();
  insertedCandidate$ = this.addedCandidate.asObservable()

  name: string = this.route.snapshot.params.id;
  getCandidates$ = this.orgservice.getCandidates(this.name).pipe(
    map(x => x.allCands)
  )
  show = false;
  candiateCred = {
    firstname: '',
    lastname: '',
    position: '',
    Image: '',
    
  }

  // use scheduled and mergeAll (e.g. `scheduled([ob1, ob2, ob3], scheduled).pipe(mergeAll())

  candidateswithAdded$ = merge(
    this.getCandidates$.pipe(
      tap(x => console.log(x, 'from x'))
    ),
    this.insertedCandidate$.pipe(
      tap(x => console.log(x, 'from candidate'))
    )
  ).pipe(
    scan((candidates: any, candidate: any) => this.modifyProducts(candidates, candidate))
   
  )
  constructor(private route: ActivatedRoute, private orgservice: OrgService) { }

  ngOnInit(): void {
    // alert(this.name)
  }

  selectImage(event: any): void{
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.candiateCred.Image = file
    }
  }
  modifyProducts(candidates:any, candidate: any){
    if(typeof(candidate) === 'string'){
      return candidates.filter((x: { _id: string; }) => x._id !== candidate)
    }
    return [...candidates, candidate]
  }


  launchdemo(): void{
  
    this.display = "block"
  }

  onCloseHandled(): void{
    this.display = "none"
    
  }

  onSubmit(form:NgForm): void{
    this.show = true
    if(this.updateFlag){
      this.orgservice.updateCandidate(this.candidatesId, this.candiateCred).subscribe(
        res => {this.errorOrConfrimsg = res.message; this.show = false;},
        err => {this.errorOrConfrimsg = err; this.show = false}
      )
      
      return
    }
    const formdata = new FormData()
    formdata.append('firstname', this.candiateCred.firstname)
    formdata.append('lastname', this.candiateCred.lastname)
    formdata.append('position', this.candiateCred.position)
    formdata.append('Image', this.candiateCred.Image)
    formdata.append('id', this.name)

    this.orgservice.creteCandidate(formdata).subscribe(
        res => {
          let candidate = this.setCandidateInfo() 
          this.addedCandidate.next(candidate); 
          this.show = false;
           form.resetForm()
          },
        err => {console.log(err); this.show = false;}
    )
  }

  update(candidate: any){
    this.candiateCred = candidate
    this.updateFlag = true
    this.candidatesId = candidate._id
    this.launchdemo()

  }

  delete(id:string){
    this.orgservice.deleteCandidate(id).subscribe(
      res => {    this.addedCandidate.next(id)},
      err => console.log(err)
    )
    
  }

  setCandidateInfo(){
    let candidate = {
      firstname: this.candiateCred.firstname,
      lastname: this.candiateCred.lastname,
      position: this.candiateCred.position
    }
    return candidate
  }
}
