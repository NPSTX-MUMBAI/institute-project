import { Address } from './address.model';
export interface InstituteInfoModel {
    userId: string;
    instituteName: string;
    instituteType: INSTITUTE_TYPE;
    institutePhone: string;
    instituteWebsite: string;
    instituteEmail: string;
    boardType: any;

    spocName: string;
    spocNumber: string;
    spocEmail: any;

    address?: Address;
}

export enum INSTITUTE_TYPE {
    'SCHOOL' = 'SCHOOL',
    'JrCollege' = 'JrCollege',
    'UNIVERSITY' = 'UNIVERSITY',
    'COACHING' = 'COACHING',
    'KG' = 'KG',
}
