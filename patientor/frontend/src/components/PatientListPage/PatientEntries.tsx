import { Typography } from "@mui/material";
import { Entry } from "../../types";

import EntryDetails from "./EntryDetails";

interface Props {
  entries: Entry[]
}

const PatientEntries = ({ entries }: Props) => {
  const isEntries: boolean = entries.length > 0;

  return (
    <div>
      <Typography variant="h6" sx={{ marginTop: 2 }}>entries</Typography>
      
      {isEntries && entries.map(entry =>
        <EntryDetails key={entry.id} entry={entry} />
      )}

      {!isEntries && <Typography>No information availble</Typography>}
    </div>
  );
};

export default PatientEntries;