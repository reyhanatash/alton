import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(
    private http: HttpClient
  ) { }
  url = environment.url;

  generateCode(model: any) {
    const uri = `${this.url}api/code/generateCode`;
    const token: any = localStorage.getItem("atoken");
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }),
    };
    return this.http.post(uri, model, httpOptions);
  }

  assignCode(model: any) {
    const uri = `${this.url}api/code/assignCode`;
    const token: any = localStorage.getItem("atoken");
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }),
    };
    return this.http.post(uri, model, httpOptions);
  }
}