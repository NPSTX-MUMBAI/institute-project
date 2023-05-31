import { Address } from './address.model';
export interface InstituteInfoModel {
    userId: string;
    instituteName: string;
    instituteType: INSTITUTE_TYPE;
    institutePhone: string;
    instituteWebsite: string;
    instituteEmail: string;
    boardType: any;
    address?: Address;
}

export enum INSTITUTE_TYPE {
    'SCHOOL' = 'SCHOOL',
    'JrCollege' = 'JrCollege',
    'UNIVERSITY' = 'UNIVERSTITY',
    'COACHING' = 'COACHING',
}
