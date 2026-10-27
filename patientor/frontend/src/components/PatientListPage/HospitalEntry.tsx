import { Card, CardContent, Typography } from "@mui/material";
import { HospitalEntry as HospitalEntryType } from "../../types";

import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';

const HospitalEntry = ({ entry }: { entry: HospitalEntryType }) => {
  return (
    <div>
      <Card variant="outlined" sx={{ marginBottom: 1 }}>
        <CardContent>
          <Typography fontWeight='bold'>
            {entry.date}
            <LocalHospitalRoundedIcon sx={{ verticalAlign: 'middle', marginLeft: 0.5 }} />
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            {entry.description}
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            Discharge:
          </Typography>
          <Typography sx={{ marginLeft: 2 }}>
            {entry.discharge.date}
          </Typography>
          <Typography sx={{ marginLeft: 2 }}>
            {entry.discharge.criteria}
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            diagnose by {entry.specialist}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default HospitalEntry;