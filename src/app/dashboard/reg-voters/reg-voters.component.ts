import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Subject } from 'rxjs';
import { map, tap,scan } from 'rxjs/operators';
import { OrgService } from '../org.service';
import { IRegVoters } from './regvotersInterface';
import {NgForm } from '@angular/forms';

@Component({
  selector: 'app-reg-voters',
  templateUrl: './reg-voters.component.html',
  styleUrls: ['./reg-voters.component.css']
})

export class RegVotersComponent implements OnInit {
  ermsg!:string;
  errorOrConfirmsg!: string
  display = 'none'
  updateFlag = false;
  private votersId!: string
  private addVoter = new Subject<any>();
  insertedVoter$ = this.addVoter.asObservable()
  name: string = this.route.snapshot.params.id;
  file:any

  voterInfo: IRegVoters = {
    firstname: '',
    lastname: '',
    email: '',
    id: ''

  }

  show = false
  shown = false
  emails!: string;
  constructor(private orgservice:OrgService, private route: ActivatedRoute, private router: Router) { }

  getVoters$ = this.orgservice.getVoters(this.name).pipe(
    map(x => x.allVoters)
  )

  

  votersWithAdded$ = merge(
    this.getVoters$,
    this.insertedVoter$
  ).pipe(
    scan((candidates: any, candidate: any) => this.modifyVoters(candidates, candidate))
  )

  launchdemo(): void{
  
    this.display = "block"
  }

  onCloseHandled(): void{
    this.display = "none"
    this.updateFlag = false;
    this.addVoter.next('')
  }

  ngOnInit(): void {
  }

 
  selectImage(event:any){
    if(event.target.files.length > 0){0
      const file = event.target.files[0];
      this.file = file
    }
  }

  modifyVoters(candidates: any, candidate: any){
    if(candidate === 'file'){
      return [...candidates]
    }
    else if(typeof(candidate) === 'string'){
      return candidates.filter((x: { _id: string; }) => x._id !== candidate)
    }
    return [...candidates, candidate]
  }


  submit(): void{
    if(this.file){
      this.show = true
      let formdata = new FormData()
      formdata.append('file', this.file)
  
      this.orgservice.regVoters(formdata, this.name).subscribe(
        res => {this.ermsg = 'updated succesfully'; location.reload(); },
        err => {this.ermsg = 'could not upload file check file type and try again'}
      )
      this.show = false
    }else{
      this.ermsg = 'no file chosen pleae select file'
    }
   
  }

  update(candidate: any){
    this.updateFlag = true
    this.voterInfo = candidate
    this.votersId = candidate._id
    this.launchdemo()
  }

  onSubmit(form:NgForm){
    if(this.updateFlag){
       this.orgservice.updateVoter(this.votersId, this.voterInfo).subscribe(
        res => {alert('we have updated'); },
        err => {
          this.errorOrConfirmsg = err
        }
      )
    }else{
      this.voterInfo.id = this.name
      this.orgservice.createVoter(this.voterInfo).subscribe(
        res => { 
          let voter = this.setVotersInfo()
          this.errorOrConfirmsg = res.message; 
          this.addVoter.next(voter);
          form.resetForm()

        },
        err => {this.errorOrConfirmsg = err}
        // () => {form.resetForm()}
      )
    }
  }

  

  delete(id: string){
    this.orgservice.deleteVoter(id).subscribe(
    res => {
      this.addVoter.next(id)

    }, err => {
      console.log(err)
    }
    )
  }

  setVotersInfo(){
    let voter = {
      firstname: this.voterInfo.firstname,
      lastname: this.voterInfo.lastname,
      email: this.voterInfo.email
    }
    return voter
  }

  sendEmails(){
    this.shown = true
    this.emails = 'sending emails'
    this.orgservice.sendEmails(this.name).subscribe(
      res => {
        console.log(res)
        this.shown = false;
        this.emails = res.message
      },
      err => {
        console.log(err)
        this.shown = false;
        this.emails = err
      }
    )
  }

}
