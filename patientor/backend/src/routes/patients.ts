import express, { type Response } from 'express';
import type { NonSensitivePatientEntry, NewPatientEntry, PatientEntry } from '../types.ts';
import patientService from '../services/patientService.ts';
import parseNewPatientEntry from '../utils/parseNewPatientEntry.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry: NewPatientEntry = parseNewPatientEntry(req.body);
    const addedPatient: PatientEntry = patientService.addNewPatientEntry(newPatientEntry);
    res.status(201).json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send({ error: `Error: ${errorMessage}`});
  }
});

export default router;