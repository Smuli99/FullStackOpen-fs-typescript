import { Patient } from "../../types";
import { Typography } from "@mui/material";

import MaleRoundedIcon from '@mui/icons-material/MaleRounded';
import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';

interface Props {
  patient: Patient | undefined;
}

const PatientPage = ({ patient }: Props) => {
  if (!patient) return null;

  return (
    <div>
      <Typography variant="h5">
        {patient.name}
        {patient.gender === 'male' && <MaleRoundedIcon sx={{ verticalAlign: "middle", ml: 1 }}/>}
        {patient.gender === 'female' && <FemaleRoundedIcon sx={{ verticalAlign: "middle", ml: 1 }}/>}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        ssn: {patient.ssn}
      </Typography>
      <Typography variant="body1">
        occupation: {patient.occupation}
      </Typography>
      <Typography variant="body1">
        date of birth: {patient.dateOfBirth}
      </Typography>
    </div>
  );
};

export default PatientPage;