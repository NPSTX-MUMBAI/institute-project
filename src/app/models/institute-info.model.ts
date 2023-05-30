import { Address } from './address.model';
export interface InstituteInfo {
    instituteName: string;
    instituteType: INSTITUTE_TYPE;
    institutePhone: string;
    instituteWebsite: string;
    instituteEmail: string;
    board: string[];
    address: Address;
}

export enum INSTITUTE_TYPE {
    'SCHOOL' = 'SCHOOL',
    'JrCollege' = 'JrCollege',
    'UNIVERSITY' = 'UNIVERSTITY',
    'COACHING' = 'COACHING',
}
