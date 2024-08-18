export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface DiagnosisEntry {
  code: string,
  name: string,
  latin?: string
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;

  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Dischage {
  date: string,
  criteria: string
}

export interface SickLeave {
  startDate: string,
  endDate: string
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Dischage;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
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

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;