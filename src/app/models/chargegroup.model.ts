import { Charge } from './charge.model'

export interface ChargeGroup {
  // idx: number;
  enabled?: boolean
  instituteId: string
  _id?: string
  name: string
  description?: string
  applicableOn: string[]
  // charges: chargeColl[];
  charges: any[]
  createdOn?: Date
  createdBy?: string
  modifiedOn?: Date
  modifiedBy?: string
  isDelete?: boolean
}

export interface chargeColl {
  chargeGroupName?: string
  chargeId: string
  chargeName: string
  rate: number
}
