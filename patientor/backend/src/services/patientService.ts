import patients from '../data/patients.ts';
import type { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    })
  );
};

const addNewPatientEntry = (entry: NewPatientEntry): PatientEntry => {
  const newEntry: PatientEntry = ({ ...entry, id: uuid() });
  patients.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addNewPatientEntry
};