import { Typography } from "@mui/material";
import { Entry } from "../../types";

interface Props {
  entries: Entry[]
}

const PatientEntries = ({ entries }: Props) => {
  // const assertNever = (value: never): never => {
  //   throw new Error(`Unhandeled discriminated union member: ${JSON.stringify(value)}`);
  // };

  console.log(entries);
  return (
    <div>
      <Typography variant="h6" sx={{ marginTop: 2 }}>entries</Typography>

      {entries.map(entry =>
        <div>
          <Typography key={entry.id} sx={{ marginTop: 2 }}>
            {entry.date} {entry.description}
          </Typography>

          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map(d =>
                <li key={d}>{d}</li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientEntries;