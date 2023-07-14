import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StateService } from './state.service';
import {
    catchError,
    debounceTime,
    map,
    retry,
    tap,
    timeout,
} from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

    constructor(private http: HttpClient, private stateSvc: StateService) {}


    

}
