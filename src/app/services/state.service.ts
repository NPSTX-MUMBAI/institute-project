import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    private _applicationId!: string;

    private _myUserId: any;

    constructor() {}

    public set applicationId(id: string) {
        this._applicationId = id;
    }

    public get applicationId() {
        return this._applicationId;
    }

    public setUserId(id: any) {
        this._myUserId = id;
    }
    public getUserId() {
        return this._myUserId;
    }

    public setUserData(key: string, userData: any) {
        localStorage.setItem(key, userData);
    }

    public getUserData(key: string) {
        let data = localStorage.getItem(key);
        return data;
    }

    initialUserDetails: any = {};
    private userDetailsSource: BehaviorSubject<any> = new BehaviorSubject<any>(
        this.initialUserDetails
    );
    public userDetailsObservable: Observable<any> =
        this.userDetailsSource.asObservable();

    setData(userDetails: any) {
        console.log(userDetails);
        this.userDetailsSource.next(userDetails);
    }

    getData(): Observable<any> {
        console.log(this.userDetailsObservable);
        return this.userDetailsObservable;
    }
}
