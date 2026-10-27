import { ReactNode, useEffect, useState } from "react";
import { Diagnosis } from "./types";
import { DiagnosisContext } from "./hooks";
import diagnoseService from './services/diagnoses';

export const DiagnosisProvider = ({ children }: {children: ReactNode }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    diagnoseService.getAll().then(data => setDiagnoses(data));
  }, []);

  const getDiagnoseName = (code: string): string | undefined =>
    diagnoses.find(d => d.code === code)?.name;

  return (
    <DiagnosisContext.Provider value={{ diagnoses, getDiagnoseName }}>
      {children}
    </DiagnosisContext.Provider>
  );
};