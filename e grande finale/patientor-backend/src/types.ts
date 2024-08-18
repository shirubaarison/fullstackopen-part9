export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Entry {
}

export interface DiagnosisEntry {
  code: string,
  name: string,
  latin?: string
}

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export type NoSsnPatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<PatientEntry, 'id'>;
export type NonSensitivePatient = Omit<PatientEntry, 'ssn' | 'entries'>;