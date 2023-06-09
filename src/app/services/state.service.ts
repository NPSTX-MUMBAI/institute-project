import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    private _applicationId!: string;

    private _myUserId: any;



    constructor() {
    }

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
}
