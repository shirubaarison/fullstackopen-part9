import { OccupationalHealthcareEntry } from "../../types";
import { Typography } from '@mui/material';
import { Work as WorkIcon } from '@mui/icons-material';

interface Props {
  occupationalHealthcareEntry: OccupationalHealthcareEntry
}

const OccupationalHealthcare = ({ occupationalHealthcareEntry }: Props): JSX.Element => (
  <Typography variant="h6">
    <WorkIcon /> {occupationalHealthcareEntry.date} | {occupationalHealthcareEntry.employerName} |
    <Typography variant="body2">
      {occupationalHealthcareEntry.description}
    </Typography>
    <Typography variant="body2">
      diagnosed by {occupationalHealthcareEntry.specialist}
    </Typography>
  </Typography>
);

export default OccupationalHealthcare;