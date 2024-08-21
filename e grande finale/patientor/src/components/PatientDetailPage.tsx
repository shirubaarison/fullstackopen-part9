import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patients from "../services/patientsServices";
import { Diagnosis, Entry, EntryFormValues, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, Patient } from "../types";
import { Typography, Card, CardContent, Box, ListItem, ListItemText, List } from '@mui/material';
import {
  Male as MaleIcon,
  Female as FemaleIcon,
  Work as WorkIcon,
  LocalHospital as LocalHospitalIcon,
  Accessibility as AccessibilityIcon,
  MonitorHeart as MonitorHeartIcon,
  HeartBroken as HeartBrokenIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';
import diagnosesServices from "../services/diagnosesServices";
import { assertNever } from "../utils";
import PatientDetailEntryForm from "./PatientDetailEntryForm";
import patientsServices from "../services/patientsServices";
import axios from "axios";

interface HospitalProps {
  hospitalEntry: HospitalEntry
}

interface OccupationalHealthCareProps {
  occupationalHealthcareEntry: OccupationalHealthcareEntry
}

interface HealthCheckProps {
  healthCheckEntry: HealthCheckEntry;
}

const Hospital = ({ hospitalEntry }: HospitalProps): JSX.Element => {
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

const OccupationalHealthcare = ({ occupationalHealthcareEntry }: OccupationalHealthCareProps): JSX.Element => (
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

const HealthCheck = ({ healthCheckEntry }: HealthCheckProps): JSX.Element => 
{
  const renderHealthIcon = (health: number) => {
    switch (health) {
      case 0:
        return <FavoriteIcon style={{ color: 'red' }} />;
      case 1:
        return <FavoriteIcon style={{ color: 'orange' }}/>;
      case 2:
        return <FavoriteIcon style={{ color: 'gray' }}/>;
      case 3:
        return <HeartBrokenIcon style={{ color: 'black' }}/>;
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

const PatientDetailPage = (): JSX.Element => {
  const {id} = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {  
    const fetchData = async () => {
      if (id) {
        const p = await patients.getPatient(id);
        setPatient(p);
      }

      const diag = await diagnosesServices.getAll();
      setDiagnoses(diag);
    };

    fetchData();
  }, [id]);

  const addEntriesEntry = async (values: EntryFormValues) => {
    if (patient) { 
      try {
        const newEntry = await patientsServices.addEntry(patient.id, values);
        const updatedEntries = (patient.entries ?? []).concat(newEntry);
        setPatient({ ...patient, entries: updatedEntries });
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e.response?.data && typeof e.response.data === "string") {
            const message = e.response.data.replace('Something went wrong. Error: ', '');
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    }
    setTimeout(() => {
      setError(undefined);
    }, 5000);
  };

  if (!patient) return <div>Not found</div>;

  const renderGenderIcon = (gender: string) => {
    switch (gender) {
      case 'male':
        return <MaleIcon />;
      case 'female':
        return <FemaleIcon />;
      case 'other':
        return <AccessibilityIcon />;
      default:
        return null;
    }
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <Hospital hospitalEntry={entry}/>;
      case "OccupationalHealthcare":
        return <OccupationalHealthcare occupationalHealthcareEntry={entry}/>;
      case "HealthCheck":
        return <HealthCheck healthCheckEntry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return  (
    <>
      <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom display="flex" alignItems="center">
            {patient.name} {renderGenderIcon(patient.gender)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            SSN: {patient.ssn}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Occupation: {patient.occupation}
          </Typography>
          <Box mt={3}>
            <Typography variant="h5" gutterBottom>
              Entries
            </Typography>
            <List>
              {patient.entries?.map(entry => (
                <Box key={entry.id} mb={2}>
                  <EntryDetails entry={entry} />
                  {entry.diagnosisCodes && entry.diagnosisCodes.map(code =>
                    <ListItem key={code} sx={{ pl: 0 }}>
                      <ListItemText
                        primary={`${code} ${diagnoses?.find(d => d.code === code)?.name || "Unknown"}`}
                      />
                    </ListItem>
                  )}
                </Box>
              ))}
            </List>
            <PatientDetailEntryForm onSubmit={addEntriesEntry} error={error}/>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default PatientDetailPage;