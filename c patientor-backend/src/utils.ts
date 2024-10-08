import { Gender, NewPatientEntry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  if (!isString(name))
    throw new Error('Incorrect name');

  return name;
};

const parseDateOfBirth = (date: unknown): string => {
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

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender))
    throw new Error('Incorrect gender: ' + gender);
  
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation))
    throw new Error('Incorrect occupation: ' + occupation);
  
  return occupation;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object')
    throw new Error('Incorrect or missing data');
  
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };

    return newEntry;
  }
  
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;