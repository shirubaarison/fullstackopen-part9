import { HealthCheckEntry, HealthCheckRating } from "../../types";
import { Typography } from '@mui/material';

import {
  MonitorHeart as MonitorHeartIcon,
  HeartBroken as HeartBrokenIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';

interface Props {
  healthCheckEntry: HealthCheckEntry;
}

const HealthCheck = ({ healthCheckEntry }: Props): JSX.Element => 
{  
  const renderHealthIcon = (health: number) => {
        
    switch (health) {
      case HealthCheckRating.Healthy:
        return <FavoriteIcon style={{ color: 'red' }} />;
      case HealthCheckRating.LowRisk:
        return <FavoriteIcon style={{ color: 'orange' }} />;
      case HealthCheckRating.HighRisk:
        return <FavoriteIcon style={{ color: 'gray' }} />;
      case HealthCheckRating.CriticalRisk:
        return <HeartBrokenIcon style={{ color: 'black' }} />;
      default:
        return null;
    }
};
  
  return (
    <Typography variant="h6">
      <MonitorHeartIcon /> {healthCheckEntry.date} | {renderHealthIcon(healthCheckEntry.healthCheckRating)} |
      <Typography variant="body2">
        {healthCheckEntry.description}
      </Typography>
      <Typography variant="body2">
        diagnosed by {healthCheckEntry.specialist}
      </Typography>
    </Typography>
  );  
};

export default HealthCheck;