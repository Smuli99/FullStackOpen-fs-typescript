import { Entry } from "../../types";
import { assertNever } from "../../constants";

import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HospitalEntry from "./HospitalEntry";

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;