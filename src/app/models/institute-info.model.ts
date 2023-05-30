import { Address } from './address.model';
export interface InstituteInfoModel {
    instituteName: string;
    instituteType: INSTITUTE_TYPE;
    institutePhone: string;
    instituteWebsite: string;
    instituteEmail: string;
    board:any
    address: Address;
}

export enum INSTITUTE_TYPE {
    'SCHOOL' = 'SCHOOL',
    'JrCollege' = 'JrCollege',
    'UNIVERSITY' = 'UNIVERSTITY',
    'COACHING' = 'COACHING',
}
