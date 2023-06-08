import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


const PIN_URL: string = "https://api.postalpincode.in/pincode/";
@Injectable({
  providedIn: "root",
})
export class AddressService {
  constructor(private http: HttpClient) {}
  getPinData(code: string): Observable<any> {
    return this.http.get<any>(PIN_URL + code);
  }
}