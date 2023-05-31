export interface BankInfoModel {
    accountHolderName: string;
    accountType: ACCOUNT_TYPE;
    accountNo: string;
    ifsc: string;

    bankName: string;
    branch: string;
    state: string;
    district: string;
    city: string;
    pinCode?: string;
}

export enum ACCOUNT_TYPE {
    'SAVING' = 'SAVING',
    'CURRENT' = 'CURRENT',
}
