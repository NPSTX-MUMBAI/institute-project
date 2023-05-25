import { Address } from "./address.model";

export interface User {
  _id?: string;
  studentId?: string;
  address?: Address;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNo?: string;
  password?: string;
  userType?: USER_TYPE;
  dob?: Date;
  age?: number;
  instituteId?: string;
  instUniqueNo?: number;
  gender?: string;
  enabled?: boolean;
  pin?: string;
  otp?:number;
}

export enum USER_TYPE {
  "superadmin" = "superadmin",
  "admin" = "admin",
  "student" = "student",
  "parent" = "parent",
}
