import diagnoses from '../data/diagnoses.ts';
import type { DiagnoseEntry } from '../types.ts';

const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};