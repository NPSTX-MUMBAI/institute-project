export interface Charge {
  _id?: string;
  rate: number;
  instituteId?: string;
  description?: "";
  name: string;
  createdOn?: Date;
  createdBy?: string;
  modifiedOn?: Date;
  modifiedBy?: string;
  enabled?: boolean;
  edit?: boolean;
  chargeGroupName?:string;
}

export enum RECURRING_OPTION {
  "DAILY" = "DAILY",
  "WEEKLY" = "WEEKLY",
  "MONTHLY" = "MONTHLY",
  "YEARLY" = "YEARLY",
  "QUARTERLY" = "QUARTERLY",
  "HALF_YEARLY" = "HALF_YEARLY",
  "EVERY_X_DAYS" = "EVERY_X_DAYS",
  "EVERY_X_WEEKS" = "EVERY_X_WEEKS",
  "EVERY_X_MONTHS" = "EVERY_X_MONTHS",
  "EVERY_X_YEARS" = "EVERY_X_YEARS",
}

export enum CHARGE_TYPE {
  "RECURRING" = "RECURRING",
  "STANDALONE_RECURRING" = "STANDALONE_RECURRING",
  "NON_RECURRING" = "NON_RECURRING",
  "STANDALONE_NON_RECURRING" = "STANDALONE_NON_RECURRING",
}
