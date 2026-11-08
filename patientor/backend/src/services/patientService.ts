import patients from '../data/patients.ts';
import type { Patient, NonSensitivePatientEntry, NewPatientEntry, NewEntry, Entry } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
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

const getPatient = (id: string): Patient => {
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

const addNewPatient = (entry: NewPatientEntry): Patient => {
  const newEntry: Patient = ({ ...entry, id: uuid(), entries: [] });
  patients.push(newEntry);
  return newEntry;
};

const addNewEntry = (id: string, entry: NewEntry): Entry => {
  const patient: Patient | undefined = patients.find(p => p.id === id);
  if (!patient) throw new Error(`Patient with id: ${id} not found`);

  const newEntry: Entry = ({ ...entry, id: uuid() });
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatient,
  addNewPatient,
  addNewEntry,
};