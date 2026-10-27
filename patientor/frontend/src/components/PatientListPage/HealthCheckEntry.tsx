import { Card, CardContent, Typography } from "@mui/material";
import { HealthCheckEntry as HealthCheckEntryType, HealthCheckRating } from "../../types";
import { assertNever } from "../../constants";

import MedicalInformationRoundedIcon from '@mui/icons-material/MedicalInformationRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

const HealthCheckEntry = ({ entry }: { entry: HealthCheckEntryType }) => {
  const ratingColor = (rating: HealthCheckRating): string => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return 'green';
      case HealthCheckRating.LowRisk:
        return 'gold';
      case HealthCheckRating.HighRisk:
        return 'orange';
      case HealthCheckRating.CriticalRisk:
        return 'black';
      default:
        return assertNever(rating);
    }
  };
  
  return (
    <div>
      <Card variant="outlined" sx={{ marginBottom: 1 }}>
        <CardContent>
          <Typography fontWeight='bold'>
            {entry.date}
            <MedicalInformationRoundedIcon
              fontSize='small'
              sx={{ verticalAlign: 'middle', marginLeft: 0.5 }}
            />
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            {entry.description}
          </Typography>
          <Typography>
            <FavoriteRoundedIcon sx={{ color: ratingColor(entry.healthCheckRating) }} />
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            diagnose by {entry.specialist}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthCheckEntry;