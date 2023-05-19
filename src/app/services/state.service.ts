import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _applicationId!:string;

  constructor() { }

  public set applicationId(id:string){
    this._applicationId=id
  }

  public get applicationId(){
    return this._applicationId
  }
}
