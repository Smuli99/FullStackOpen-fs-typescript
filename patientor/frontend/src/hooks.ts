import { useContext, createContext } from "react";
import { Diagnosis } from './types';

interface DiagnosisContextType {
  diagnoses: Diagnosis[];
  getDiagnoseName: (code: string) => string | undefined;
}

export const DiagnosisContext = createContext<DiagnosisContextType>({
  diagnoses: [],
  getDiagnoseName: () => undefined,
});

export const useDiagnoses = () => useContext(DiagnosisContext);