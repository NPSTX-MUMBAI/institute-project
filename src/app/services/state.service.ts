import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    private _applicationId!: string;

    private _myUserId: any;

    schoolIdChange: EventEmitter<string> = new EventEmitter<string>();
    schoolId: string;

    constructor() {
        this.schoolId = localStorage.getItem('schoolId') || '';
        this.emitSchoolIdChange();
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

        if (key == 'schoolId') {
            this.emitSchoolIdChange();
        }
    }

    emitSchoolIdChange() {
        this.schoolIdChange.emit(this.schoolId);
    }
    public getUserData(key: string) {
        let data = localStorage.getItem(key);
        return data;
    }
}
