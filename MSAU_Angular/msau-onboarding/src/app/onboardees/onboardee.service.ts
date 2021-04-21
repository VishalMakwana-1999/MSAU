import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OnboardeeService {
  onboardee_list: any;
  constructor(private http: HttpClient) { }

  fetchOnboardees(): any {
    return this.http.get("/fetch_onboardees")
  }
  fetchOnboardees_byId(id: number): any {
    return this.http.get(`/fetch_onboardees/${id}`)
  }
}
