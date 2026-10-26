import express, { type Request, type Response } from 'express';
import type { NonSensitivePatientEntry, NewPatientEntry, Patient } from '../types.ts';
import patientService from '../services/patientService.ts';
import { errorMiddleware, newPatientParser } from '../middleware.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res: Response<Patient>) => {
  const patient: Patient = patientService.getPatientEntries(req.params.id);
  res.send(patient);
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const addedPatient: Patient = patientService.addNewPatientEntry(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;