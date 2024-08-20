import patientsData from '../../data/patients';
import { Entry, EntryWithoutId, HealthCheckEntry, HospitalEntry, NewPatientEntry, NonSensitivePatient, NoSsnPatientEntry, OccupationalHealthcareEntry, PatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: PatientEntry[] = patientsData;

const getPatients = (): NonSensitivePatient[] => {
  return patients;
};

const getPatient = (id: string): PatientEntry | null => {
  const patientFound = patients.find(p => p.id === id);

  if (patientFound)
    return patientFound;

  return null;
};

const getPatientsNoSsn = (): NoSsnPatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};


const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id = uuid();
  
  const newPatientEntry = {
    id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const patientFound = patients.find(p => p.id === patientId);
  
  if (!patientFound) {
    throw new Error(`Patient with id ${patientId} not found`);
  }

  let newEntry: Entry;
  
  switch (entry.type) {
    case "HealthCheck":
      newEntry = {
        ...entry,
        id: uuid(),
        healthCheckRating: entry.healthCheckRating
      } as HealthCheckEntry;
      break;

      case "Hospital":
      newEntry = {
        ...entry,
        id: uuid(),
        discharge: entry.discharge
      } as HospitalEntry;
      break;

      case "OccupationalHealthcare":
      newEntry = {
        ...entry,
        id: uuid(),
        employerName: entry.employerName
      } as OccupationalHealthcareEntry;
      break;
      
      default:
        throw new Error(`Unhandled entry type: ${entry}`);
    } 

  patientFound.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatient,
  getPatientsNoSsn,
  addPatient,
  addEntry
};