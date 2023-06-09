export interface Bank {
  
  instituteId?: string;
  _id?: string;
  accountHolderName: string;
  accountType: ACCOUNT_TYPE;
  accountNo: string;
  ifsc: string;

  bankname: string;
  branch: string;
  zipCode?: string;
  state: string;
  district: string;
  city: string;
  centre: string;
  address?: string;
  bankCode: string;

  contact?: string;
  imps?: boolean;
  neft?: boolean;
  rtgs?: boolean;
  upi?: string;
  mid?: string;
  merchantId?: string;
  sid?: string;
  micr?: string;
  createdOn?: Date;
  createdBy?: string;
  edit?: boolean;
  enabled?: boolean;
  deleted?: boolean;
}

export enum ACCOUNT_TYPE {
  "SAVING" = "SAVING",
  "CURRENT" = "CURRENT",
}
