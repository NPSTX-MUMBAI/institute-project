import { Charge } from "./charge.model";
// import { chargeColl, ChargeGroup } from './chargegroup.model'

export interface Collection {
  _id?: string;
  instituteId?: string;
  name: string;

  description: string;
  sources: RAISE_SOURCE[];
  vpa: any;
  createdOn?: Date;
  createdBy?: string;
  modifiedOn?: Date;
  modifiedBy?: string;
  collectionStatus?: string;
  enabled: boolean;
  isDeleted?: boolean;
  applicableOn?: ApplicableOn[];
  charges?: chargeColl[];
  checked?: boolean;
  disabled?: boolean;

  freq?: number;
  // raiseDate: Date
  dueDate: string;
  startDate?: string;
  endDate?: string;
  invoiceDate?: string;
  notificationDate?: number;
  fullNotificationDate?: string;

  recurring?: boolean;
  chargeGroups?: any;
  // chargeGroups: chargeGroupColl[];
}

export enum RAISE_SOURCE {
  "whatsapp" = "whatsapp",
  "email" = "email",
  "sms" = "sms",
}
export interface chargeColl {
  chargeGroupName?: string;
  chargeId: string;
  chargeName: string;
  rate: number;
}

export interface ApplicableOn {
  studentId: string;
  studentFullName: string;
  studentMobile?: string;
  studentEmail: string;
  recipientMobile: string;
  recipientFullName: string;
  recipientEmail: string;
  balance: any;
  studentStd?: string;
  studentDiv?: string;
  studentregId?: string;
  notificationSend?: boolean;

  customCharges?: [
    {
      chargeId: string;
      chargeName: string;
      rate: number;
    }
  ];
}
