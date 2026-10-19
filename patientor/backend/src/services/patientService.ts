import patients from '../data/patients.ts';
import type { PatientEntry, NonSensitivePatientEntry } from '../types.ts';

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

export default {
  getEntries,
  getNonSensitiveEntries
};