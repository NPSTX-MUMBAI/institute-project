import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    private _applicationId!: string;

    constructor() {}

    public set applicationId(id: string) {
        this._applicationId = id;
    }

    public get applicationId() {
        return this._applicationId;
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
