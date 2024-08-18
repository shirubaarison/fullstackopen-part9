import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patients from "../services/patients";
import { Diagnosis, Patient } from "../types";
import { Typography, Card, CardContent, Box, ListItem, ListItemText, List } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import diagnosesServices from "../services/diagnosesServices";

const PatientDetailPage = (): JSX.Element => {
  const {id} = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

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

  if (!patient) return <div>Loading...</div>;

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

  return  (
  <>
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom display="flex" alignItems="center">
          {patient.name} | {renderGenderIcon(patient.gender)}
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
            {patient.entries?.map(e => (
              <Box key={e.id} mb={2}>
                <Typography variant="body1">
                {e.date} {e.description}
                </Typography>
                {e.diagnosisCodes && e.diagnosisCodes.map(code => 
                  <ListItem key={code} sx={{ pl: 0 }}>
                    <ListItemText key={code} primary={`${code} ${diagnoses?.find(d => d.code === code)?.name}`}/>
                  </ListItem>
                )}
              </Box>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  </>
);
};

export default PatientDetailPage;