export interface StudentDetails {
    studentFirstName: string;

    studentLastName: string;

    studentEmail: string;

    studentPhone: string;

    studentAddress: string;

    studentNationality: string;

    studentReligion: string;

    studentGender?: string;

    studentDateOfBirth: string;

    studentPlaceOfBirth: string;

    studentStateOfOrigin: string;

    studentLGA?: string;

    studentClass: string;

    studentClassOfChoice?: string;

    studentPreviousSchool?: string;

    studentPreviousClass?: string;

    studentPreviousClassAverage?: string;

    schoolId?: string;
}

export interface ParentsDetails {
    fatherFirstName: string;
    applicationId?: string;
    fatherLastName: string;

    fatherEmail: string;

    fatherPhone: string;

    fatherAddress: string;

    fatherNationality: string;

    fatherOccupation: string;

    motherFirstName: string;

    motherLastName?: string;

    motherEmail?: string;

    motherPhone?: string;

    motherAddress?: string;

    motherNationality?: string;

    motherOccupation?: string;

    motherReligion?: string;

    guardianFirstName: string;

    guardianLastName?: string;

    guardianEmail?: string;

    guardianPhone?: string;

    guardianAddress?: string;

    guardianNationality?: string;

    guardianOccupation?: string;

    guardianReligion?: string;
}

export interface CreateKycDto {
    applicationId: string;

    type: DOCUMENT_TYPE;

    number: string;

    kycId: string;

    isActive: boolean;

    isVerified: boolean;
}

export enum DOCUMENT_TYPE {
    'ADHARCARD' = 'ADHARCARD',
    'PANCARD' = 'PANCARD',
    'GST' = 'GST',
    'REG' = 'REG',
}
