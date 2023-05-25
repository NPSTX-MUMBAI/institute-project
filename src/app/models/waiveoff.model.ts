export interface waiveOff {
  _id: string;
  amt?: number;
  instituteId?: string;
  studentId?: string;
  customCharges?: [
    {
      chargeId: string;
      chargeName: string;
      rate: number;
    }
  ];
}
