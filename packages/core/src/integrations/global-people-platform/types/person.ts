import { ApprovedCandidate } from "./approved-candidate";

export interface Person {
  approvedCandidate: ApprovedCandidate;
  birthday?: Date;
  countryId?: number;
  createdAt?: Date;
  createdBy?: string;
  createdFrom?: number;
  fatherName?: string;
  firstName?: string;
  gender?: number;
  isFormerSeller?: boolean;
  lastName?: string;
  motherName?: string;
  name?: string;
  nationalityId?: number;
  naturaCode: string;
  nickname?: string;
  occupationId?: number;
  personId: string;
  registrationDate?: Date;
  registrationStatusId?: number;
  registrationSubstatusId?: string;
  sourceSystem?: number;
  tenantId: string;
  updatedAt?: Date;
  updatedBy?: string;
}
