import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Alert } from '@mui/material';
import { EntryFormValues, HealthCheckRating } from '../../types';

interface Props {
  onSubmit: (entry: EntryFormValues) => void;
  error?: string;
}

interface HealthCheckOption {
  value: HealthCheckRating,
  label: string
}

const healthCheckOptions: HealthCheckOption[] = Object.values(HealthCheckRating)
  .filter((value) => typeof value === 'number')
  .map((value) => ({
    value: value as HealthCheckRating,
    label: HealthCheckRating[value as HealthCheckRating]
      .replace(/([a-z])([A-Z])/g, '$1 $2')
  }));


const HealthCheckEntryForm = ({ onSubmit, error }: Props): JSX.Element => {
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const handleHealthCheckRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHealthCheckRating(Number(event.target.value) as HealthCheckRating); 
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleSpecialistChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSpecialist(event.target.value);
  };

  const handleDiagnosesCodesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const codes = event.target.value.split(',').map(code => code.trim());
    setDiagnosisCodes(codes);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes
    });

    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating(HealthCheckRating.Healthy);
    setDiagnosisCodes([]);
  };

  return (
    <Box 
      component="form" 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 2,
        border: '1px dashed #b0b0b0',
        borderRadius: 2,
        maxWidth: 400,
        margin: 'auto',
        backgroundColor: '#f9f9f9'
      }}
      onSubmit={addEntry}
    >
      <Typography variant="h6" gutterBottom>New HealthCheck entry</Typography>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField 
        label="Description" 
        variant="outlined" 
        fullWidth 
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        label="Date"
        variant="outlined"
        type="date"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        value={date}
        onChange={handleDateChange}
      />

      <TextField
        label="Specialist"
        variant="outlined"
        fullWidth
        value={specialist}
        onChange={handleSpecialistChange}
      />

      <FormControl component="fieldset">
        <FormLabel component="legend">Healthcheck rating</FormLabel>
        <RadioGroup
          aria-label="health-check-rating"
          name="health-check-rating"
          value={healthCheckRating}
          onChange={handleHealthCheckRatingChange}
        >
          {healthCheckOptions.map((option) => (
            <FormControlLabel 
              key={option.value} 
              value={option.value} 
              control={<Radio />} 
              label={option.label} 
            />
          ))}
        </RadioGroup>
      </FormControl>

      <TextField 
        label="Diagnosis codes" 
        variant="outlined" 
        fullWidth 
        placeholder="Z57.1, N30.0" 
        value={diagnosisCodes.join(', ')}
        onChange={handleDiagnosesCodesChange}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Button variant="contained" color="error">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default HealthCheckEntryForm;
