import { Bank } from "./bank.model";
import { Address } from "./address.model";
import { User } from "./user.model";

export interface Institute {
  
  _id?: string;
  currency?: string;
  instituteName: string;
  instituteType?: INSTITUTE_TYPE;
  mobileNo?: string;
  website?: string;
  email?: string;
  board?: string[];
  std?: [];
  div?: [];
  upi?: string;
  regionCode?: REGION_CODE;
  spocname?: string;
  spocNumber?: string;
  spocemail?: string;

  line1?: string;
  line2?: string;
  landmark?: string;
  zip?: string;
  country?: string;
  state?: string;
  city?: string;
  locality?: string;

  regNo?: string;
  panNo?: string;
  gstNo?: string;

  description?: string;
  logoUrl?: string;
  admins?: User[];
  banks?: Bank[];
  createdOn?: Date;
  createdBy?: string;
  modifiedOn?: Date;
  modifiedBy?: string;
  enabled?: boolean;
  uniqueno?: number;
  logo?:URL;
  qr?:URL;
}

export enum INSTITUTE_TYPE {
  "SCHOOL" = "SCHOOL",
  "JrCollege" = "JrCollege",
  "UNIVERSITY" = "UNIVERSTITY",
  "COACHING" = "COACHING",
}

export enum REGION_CODE {
  "NORTH" = "NORTH",
  "SOUTH" = "SOUTH",
  "EAST" = "EAST",
  "WEST" = "WEST",
}
