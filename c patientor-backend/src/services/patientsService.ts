import patientsData from '../../data/patients';
import { NewPatientEntry, NoSsnPatientEntry, PatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: PatientEntry[] = patientsData as PatientEntry[];

const getPatients = (): PatientEntry[] => {
  return patients;
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
  getPatientsNoSsn,
  addPatient
};