import express, { type Request, type Response } from 'express';
import type { NonSensitivePatientEntry, NewPatientEntry, Patient, NewEntry, Entry } from '../types.ts';
import patientService from '../services/patientService.ts';
import { errorMiddleware, newPatientParser } from '../middleware.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res: Response<Patient>) => {
  const patient: Patient = patientService.getPatient(req.params.id);
  res.send(patient);
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const addedPatient: Patient = patientService.addNewPatient(req.body);
  res.json(addedPatient);
});

router.post('/:id/entries', (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
  const addedEntry: Entry = patientService.addNewEntry(req.params.id, req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;