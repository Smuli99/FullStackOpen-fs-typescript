import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import diagnoseService from '../../services/diagnoses';

interface Props {
  entries: Entry[]
}

const PatientEntries = ({ entries }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await diagnoseService.getAll();
      setDiagnoses(data);
    };

    fetchData();
  }, []);
  
  const getDiagnoseName = (code: string): string | undefined =>
    diagnoses.find(d => d.code === code)?.name;

  return (
    <div>
      <Typography variant="h6" sx={{ marginTop: 2 }}>entries</Typography>

      {entries.map(entry =>
        <div key={entry.id}>
          <Typography sx={{ marginTop: 2 }}>
            {entry.date} {entry.description}
          </Typography>

          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map(d =>
                <li key={d}>{d} {getDiagnoseName(d)}</li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientEntries;