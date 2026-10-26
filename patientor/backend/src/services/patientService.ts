import patients from '../data/patients.ts';
import type { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    })
  );
};

const getPatientEntries = (id: string): PatientEntry => {
  const patient = patients.find(patient => patient.id === id);

  if (!patient) {
    throw new Error(`Patient with id: ${id} not found`);
  }
  
  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    ssn: patient.ssn,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries
  };
};

const addNewPatientEntry = (entry: NewPatientEntry): PatientEntry => {
  const newEntry: PatientEntry = ({ ...entry, id: uuid(), entries: [] });
  patients.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addNewPatientEntry,
  getPatientEntries,
};