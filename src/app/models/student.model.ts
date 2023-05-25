import { Address } from "./address.model";
import { USER_TYPE } from "./user.model";
import { Charge } from "./charge.model";
import { chargeColl } from "./chargegroup.model";

export interface Student {
  _id?: any;
  instituteId?: string;
  instUniqueNo?: number;
  firstName: string;
  lastName: string;
  regId: string;
  rollNo: string;
  dob: Date;
  gender: string;
  userType?: USER_TYPE;
  email?: string;
  mobileNo?: string;
  div?: string;
  std?: string;
  board?: string;
  checked?: boolean;

  line1?: string;
  line2?: string;
  landmark?: string;
  zip?: string;
  country?: string;
  state?: string;
  city?: string;
  locality?: string;
  regionCode?: REGION_CODE;

  fatherFirstName?: string;
  fatherLastName?: string;
  fatherEmail?: string;
  fatherMobile?: string;
  motherFirstName?: string;
  motherLastName?: string;
  motherEmail?: string;
  motherMobile?: string;
  guardianFirstName?: string;
  guardianLastName?: string;
  guardianEmail?: string;
  guardianMobile?: string;
  totalAmount?: number;
  charges?: chargeColl[];
  balance?: number;
}

export interface StudentTable {
  _id?: string;
  firstName: string;
  lastName: string;
  regId: string;
  rollNo: string;
  dob: Date;
  gender: string;
  email?: string;
  phone?: string;
  div?: string;
  std?: string;
  board?: string;
  fatherFirstName?: string;
  fatherLastName?: string;
  fatherEmail?: string;
  fatherMobile?: string;
  motherFirstName?: string;
  motherLastName?: string;
  motherEmail?: string;
  motherMobile?: string;
  guardianFirstName?: string;
  guardianLastName?: string;
  guardianEmail?: string;
  guardianMobile?: string;
  totalAmount?: number;
  address: {
    line1?: string;
    line2?: string;
    landmark?: string;
    zip?: string;
    country?: string;
    state?: string;
    city?: string;
    locality?: string;
  };
  charges?: [
    {
      chargeName: string;
      chargeId: string;
      rate: number;
    }
  ];
  disabled: boolean;
  checked: boolean;
}
export enum REGION_CODE {
  "NORTH" = "NORTH",
  "SOUTH" = "SOUTH",
  "EAST" = "EAST",
  "WEST" = "WEST",
}
