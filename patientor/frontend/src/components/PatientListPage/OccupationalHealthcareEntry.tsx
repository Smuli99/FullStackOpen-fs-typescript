import { Card, CardContent, Typography } from "@mui/material";
import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from "../../types";

import WorkRoundedIcon from '@mui/icons-material/WorkRounded';

const OccupationalHealthcareEntry = ({ entry }: { entry: OccupationalHealthcareEntryType }) => {
  return (
    <div>
      <Card variant="outlined" sx={{ marginBottom: 1 }}>
        <CardContent>
          <Typography fontWeight='bold'>
            {entry.date}
            <WorkRoundedIcon
              fontSize="small"
              sx={{ verticalAlign: 'middle', marginLeft: 0.5, marginRight: 0.5 }}
            />
            {entry.employerName}
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            {entry.description}
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            diagnose by {entry.specialist}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default OccupationalHealthcareEntry;