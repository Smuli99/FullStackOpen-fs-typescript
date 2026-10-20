import { type NewPatientEntry, Gender } from '../types.ts';

const isString = (str: unknown): str is string =>
  typeof str === 'string' || str instanceof String;

const isDate = (date: string): boolean =>
  Boolean(Date.parse(date));

// 00000-00?A
const isSsn = (ssn: string): boolean =>
  /^\d{5}-\d{2,}[a-zA-Z]?$/.test(ssn);

const isGender = (gender: string): gender is Gender =>
  (Object.values(Gender) as string[]).includes(gender);

const parseName = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error(`Incorrect type for name: ${param}`);
  }

  return param;
};

const parseDateOfBirth = (param: unknown): string => {
  if (!isString(param) || !isDate(param)) {
    throw new Error(`Incorrect type for date: ${param}`);
  }

  return param;
};

const parseSsn = (param: unknown): string => {
  if (!isString(param) || !isSsn(param)) {
    throw new Error(`Incorrect type for ssn: ${param}`);
  }

  return param;
};

const parseGender = (param: unknown): Gender => {
  if (!isString(param) || !isGender(param)) {
    throw new Error(`Incorrect type for gender: ${param}`);
  }

  return param;
};

const parseOccupation = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error(`Incorrect type for occupation: ${param}`);
  }

  return param;
};

const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    !('name' in object) ||
    !('dateOfBirth' in object) ||
    !('ssn' in object) ||
    !('gender' in object) ||
    !('occupation' in object)
  ) throw new Error(`Incorrect missing some fields`);

  const newPatientEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };

  return newPatientEntry;
};

export default parseNewPatientEntry;