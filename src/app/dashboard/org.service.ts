import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {environment} from "../../environments/environment.prod"

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  url = environment.url
  constructor(private http: HttpClient) { }

  createOrg(data:any): Observable<any>{
    return this.http.post<any>(this.url + '/Organization', data)
    .pipe(
      catchError(this.handleError)
    )
  }


  getAllOrg(): Observable<any>{
    return this.http.get<any>(this.url + '/Organization')
    .pipe(
      catchError(this.handleError)
    )
  }

  getOrg(id: string):Observable<any>{
    return this.http.get<any>(this.url+ '/Organization/id' + '?key=' + id).pipe(
      catchError(this.handleError)
    )
  }

  updateOrg(id: string, data:any):Observable<any>{
    return this.http.put<any>(this.url+ '/Organization/id' + '?key=' + id, data).pipe(
      catchError(this.handleError)
    )
  }

  deleteOrg(data: string):Observable<any>{
    return this.http.delete<any>(this.url+ '/Organization' + '?delId=' + data).pipe(
      catchError(this.handleError)
    )
  }

  creteCandidate(data:any):Observable<any>{
    return this.http.post<any>(this.url+ '/candidates', data).pipe(
      catchError(this.handleError)
    )
  }

  getCandidates(data: string):Observable<any>{
    return this.http.get<any>(this.url+ '/candidates' + '?orgId=' + data).pipe(
      catchError(this.handleError)
    )
  }

  deleteCandidate(data: string):Observable<any>{
    return this.http.delete<any>(this.url+ '/candidates' + '?delId=' + data).pipe(
      catchError(this.handleError)
    )
  }

  updateCandidate(id: string, data: any): Observable<any>{
    return this.http.put<any>(this.url+ '/candidates' + '?id=' + id, data).pipe(
      catchError(this.handleError)
    )
  }

  deleteVoter(data: string):Observable<any>{
    return this.http.delete<any>(this.url+ '/voters' + '?delId=' + data).pipe(
      catchError(this.handleError)
    )
  }

  regVoters(data: any, id: string):Observable<any>{
    return this.http.post<any>(this.url+ '/voters'+ '?orgId=' + id, data).pipe(
      catchError(this.handleError)
    )
  }
  updateVoter(id: string, data: any){
    return this.http.put<any>(this.url+ '/voters' + '?voterId=' + id, data).pipe(
      catchError(this.handleError)
    )
  }

  createVoter(data:any):Observable<any>{
    return this.http.post<any>(this.url+ '/voters/single', data).pipe(
      catchError(this.handleError)
    )
  }

  getVoters(data: string):Observable<any>{
    return this.http.get<any>(this.url+ '/voters' + '?orgId=' + data).pipe(
      catchError(this.handleError)
    )
  }
  
  handleError(err:HttpErrorResponse){
    let message = '';


    //it seems i changed the arrangement in the erros at the backend side i think i have to turn the
    // super back to the original and see but not now
    if(err.error instanceof ErrorEvent){
      message = `an error occured: ${err.error.message}`
    }
    else{
      message =  err.error 
    }
    console.log(err)
    console.log(message)

    return throwError(message)


  }
}
