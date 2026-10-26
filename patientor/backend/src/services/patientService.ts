import patients from '../data/patients.ts';
import type { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const getPatientEntries = (id: string): Patient => {
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

const addNewPatientEntry = (entry: NewPatientEntry): Patient => {
  const newEntry: Patient = ({ ...entry, id: uuid(), entries: [] });
  patients.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addNewPatientEntry,
  getPatientEntries,
};