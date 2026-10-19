import express, { type Response } from 'express';
import type { NonSensitivePatientEntry } from '../types.ts';
import patientService from '../services/patientService.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

export default router;