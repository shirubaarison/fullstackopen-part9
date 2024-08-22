import { Typography } from "@mui/material";
import { HospitalEntry } from "../../types";

import { LocalHospital as LocalHospitalIcon } from '@mui/icons-material';

interface Props {
  hospitalEntry: HospitalEntry
}

const Hospital = ({ hospitalEntry }: Props): JSX.Element => {
  return (
    <Typography variant="h6">
    <LocalHospitalIcon /> {hospitalEntry.date} | {hospitalEntry.specialist} |
    <Typography variant="body2">
      {hospitalEntry.description}
    </Typography>
    <Typography variant="body2">
      diagnosed by {hospitalEntry.specialist}
    </Typography>
  </Typography>
  );
};

export default Hospital;