import express, { type Request, type Response } from 'express';
import type { NonSensitivePatientEntry, NewPatientEntry, PatientEntry } from '../types.ts';
import patientService from '../services/patientService.ts';
import { errorMiddleware, newPatientParser } from '../middleware.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
  const addedPatient: PatientEntry = patientService.addNewPatientEntry(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;