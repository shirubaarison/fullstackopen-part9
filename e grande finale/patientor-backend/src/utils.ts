import { Diagnosis, Gender, NewPatientEntry, NewPatientEntriesEntry, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, BaseEntry, HealthCheckRating, Discharge, SickLeave } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseString = (name: unknown): string => {
  if (!isString(name))
    throw new Error('Incorrect string format');

  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date))
    throw new Error('Incorrect date: ' + date);

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn))
    throw new Error('Incorrect SSN: ' + ssn);

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const isHealth = (param: string): param is keyof typeof HealthCheckRating => {
  return Object.keys(HealthCheckRating).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender))
    throw new Error('Incorrect gender: ' + gender);
  
  return gender;
};

const parseHealth = (health: unknown): HealthCheckRating => {
  if (typeof health !== 'string' || !isHealth(health)) {
    throw new Error('Incorrect health check rating: ' + health);
  }
  
  return HealthCheckRating[health];
};


const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation))
    throw new Error('Incorrect occupation: ' + occupation);
  
  return occupation;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object')
    throw new Error('Incorrect or missing data');
  
  const requiredFields = ['name', 'dateOfBirth', 'ssn', 'gender', 'occupation'];
  const missingFields = requiredFields.filter(field => !(field in object));

  if (missingFields.length > 0) {
    throw new Error(`Incorrect data: missing fields ${missingFields.join(', ')}`);
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };

    return newEntry;
  }
  
  throw new Error('Incorrect data: some fields are missing');
};

export const toNewPatientEntriesEntry = (object: unknown): NewPatientEntriesEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const requiredBaseFields = ['description', 'date', 'specialist', 'type'];
  const missingBaseFields = requiredBaseFields.filter(field => !(field in object));

  if (missingBaseFields.length > 0) {
    throw new Error(`Incorrect data: missing base fields ${missingBaseFields.join(', ')}`);
  }

  if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
    const newEntry: Omit<BaseEntry, "id"> = {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: 'diagnosisCodes' in object ? parseDiagnosisCodes(object.diagnosisCodes) : []
    };

    switch (object.type) {
      case 'HealthCheck':
        if (!('healthCheckRating' in object)) {
          throw new Error('Incorrect data: missing field healthCheckRating');
        } 
        const newEntryHealth: NewHealthCheckEntry = {
          ...newEntry,
          type: "HealthCheck",
          healthCheckRating: parseHealth(object.healthCheckRating)
        };
        return newEntryHealth;

      case 'OccupationalHealthcare':
        if (!('employerName' in object)) {
          throw new Error('Incorrect data: missing field employerName');
        }  
        const newEntryOccupational: NewOccupationalHealthcareEntry = {
          ...newEntry,
          type: "OccupationalHealthcare",
          employerName: parseString(object.employerName),
          sickLeave: 'sickLeave' in object ? parseSickLeave(object.sickLeave) : undefined
        };
        return newEntryOccupational;

      case 'Hospital':
        if (!('discharge' in object)) {
          throw new Error('Incorrect data: missing field discharge');
        }
        const newEntryHospital: NewHospitalEntry = {
          ...newEntry,
          type: "Hospital",
          discharge: parseDischarge(object.discharge)
        };
        return newEntryHospital;

      default:
        throw new Error('Unknown entry type: ' + object.type);
    }
  }

  throw new Error('Incorrect or missing entry fields');
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing sickLeave data');
  }

  if (!('startDate' in sickLeave) || !('endDate' in sickLeave)) {
    throw new Error('Missing sickLeave fields');
  }

  return {
    startDate: parseDate((sickLeave as SickLeave).startDate),
    endDate: parseDate((sickLeave as SickLeave).endDate)
  };
};
  
const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object') {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object as Array<Diagnosis['code']>;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing discharge data');
  }

  if (!('date' in discharge) || !('criteria' in discharge)) {
    throw new Error('Missing discharge fields');
  }

  return {
    date: parseDate((discharge as Discharge).date),
    criteria: parseString((discharge as Discharge).criteria),
  };
};