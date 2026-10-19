import express, { type Response } from 'express';
import type { DiagnoseEntry } from '../types.ts';
import diagnoseService from '../services/diagnoseService.ts';

const router = express.Router();

router.get('/', (_req, res: Response<DiagnoseEntry[]>) => {
  res.send(diagnoseService.getDiagnoses());
});

export default router;