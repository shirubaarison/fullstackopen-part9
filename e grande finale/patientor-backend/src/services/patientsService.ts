import patientsData from '../../data/patients';
import { NewPatientEntry, NonSensitivePatient, NoSsnPatientEntry, PatientEntry } from '../types';
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

export default {
  getPatients,
  getPatient,
  getPatientsNoSsn,
  addPatient
};