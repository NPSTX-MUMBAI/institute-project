import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    private _applicationId!: string;
    private _mobileNo: any;

    private _mySchoolId: any;

    private _myUserId: any;

    constructor() {}

    public set applicationId(id: string) {
        this._applicationId = id;
    }

    public get applicationId() {
        return this._applicationId;
    }

    public setUserMobileNo(number: string) {
        this._mobileNo = number;
    }
    public getUserMobileNo() {
        return this._mobileNo;
    }

    public setSchoolId(id: any) {
        this._mySchoolId = id;
    }
    public getSchoolId() {
        return this._mySchoolId;
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
        console.log(data, '!!!');
        return data;
    }
}
