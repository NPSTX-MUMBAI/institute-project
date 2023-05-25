import { chargeColl } from "./chargegroup.model";
import { Charge } from "./charge.model";
export interface Invoice {
  _id: string;
  invoiceNo?: number;
  name?: string;

  instituteId?: string;
  studentId?: string;
  studentName?: string;
  studentMobile?: string;
  studentBalance?: number;
  studentStd?: string;
  studentregId?: string;
  studentDiv?: string;
  studentEmail?: string;
  dueDate?: Date;
  paidAmount?: number;

  recievedAmount?: [
    {
      paymentMode?: MODE[];

      schoolBankName?: string;
      payerBankName?: string;
      chequeNo?: string;
      status?: ChequeStatus[];

      cardNo?: string;
      TxnId?: string;

      upiId?: string;
      upiTxnId?: string;
      extTxnId?: string;
      amount: string;
      date?: any;
      remark?: string;
    }
  ];
  raiseDate: Date;
  charges?: chargeColl[];
  paidDate?: Date;
  lastRaised: number;
  startDate?: Date;
  endDate?: Date;
  invoiceDate?: Date;
  notificationDate?: string;
  notificationSend?: boolean;
  adjustments?: number;
  recurring?: boolean;
  paymentStatus?: boolean;

  sources?: RAISE_SOURCE[];

  collectionId?: string;

  partialPayment?: boolean;

  totalAmount?: number;

  totalAmountPending?: number;

  notificationAmount?: string;

  totalRecieved?: number;

  freq?: number;
}
export interface recievedObj {
  upiId?: string;
  upiTxnId?: string;
  extTxnId?: string;
  amount: string;
  date?: any;
}

export enum RAISE_SOURCE {
  "whatsapp" = "whatsapp",
  "email" = "email",
  "sms" = "sms",
}

 
export interface collName{
  _id?:any;
  name?:any;
  invoiceDate?:any;
  notificationDate?:any;
}

export enum MODE {
  "cash" = "cash",
  "upi" = "upi",
  "creditCard" = "creditCard",
  "debitCard" = "debitCard",
  "cheque" = "cheque",
  "neft/rtgs" = "neft/rtgs",
}

export enum ChequeStatus {
  "recieved" = "recieved",
  "deposited" = "deposited",
  "awaitingClearance" = "awaitingClearance",
  "bounced" = "bounced",
  "pending" = "pending",
  "PAID" = "PAID",
}
