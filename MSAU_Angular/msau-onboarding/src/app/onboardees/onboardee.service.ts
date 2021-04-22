import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { OnboardeeModel } from "./models/onboardee"
@Injectable({
  providedIn: 'root'
})
export class OnboardeeService {
  onboardee_list: any;
  constructor(private http: HttpClient) { }

  fetchOnboardees(): any {
    return this.http.get("/api/fetch_onboardees")
  }
  fetchOnboardees_byId(id: number): any {
    return this.http.get(`/api/fetch_onboardees/${id}`)
  }
  deleteOnboardee_byId(id: number): any {
    return this.http.get(`/api/delete/${id}`)
  }
  fetchManagers(): any {
    return this.http.get("/api/fetch_managers")
  }

  createOnboardee(ob: OnboardeeModel): any {
    return this.http.post("/api/create", ob)
  }
}
