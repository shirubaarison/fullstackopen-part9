import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Alert, InputLabel, Select, MenuItem, SelectChangeEvent, Checkbox, ListItemText } from '@mui/material';
import { EntryFormValues, EntryType, HealthCheckRating, Diagnosis } from '../../types';

interface Props {
  onSubmit: (entry: EntryFormValues) => void;
  error?: string;
  availableDiagnosisCodes: Diagnosis[];
}

const HealthCheckEntryForm = ({ onSubmit, error, availableDiagnosisCodes }: Props): JSX.Element => {
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [dischargeDate, setDischageDate] = useState<string>("");
  const [criteria, setCriteria] = useState<string>("");
  
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");

  const [type, setType] = useState<EntryType>(EntryType.HealthCheck);

  const handleHealthCheckRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHealthCheckRating(Number(event.target.value) as HealthCheckRating); 
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value as EntryType);
  };

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    setDiagnosisCodes(event.target.value as string[]);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
  
    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };
  
    switch (type) {
      case "HealthCheck":
        onSubmit({
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating,
        });
        break;
      case "Hospital":
        onSubmit({
          ...baseEntry,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria,
          },
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        });
        break;
      default:
        throw new Error(`Unknown entry type: ${type}`);
    }
  
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating(HealthCheckRating.Healthy);
    setDiagnosisCodes([]);
    setDischageDate("");
    setCriteria("");
    setEmployerName("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
  };

  return (
    <Box 
      component="form" 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 5,
        border: '1px dashed #b0b0b0',
        borderRadius: 2,
        margin: 'auto',
        backgroundColor: '#f9f9f9'
      }}
      onSubmit={addEntry}
    >
      <Typography variant="h6" gutterBottom>New {type} entry</Typography>
      {error && <Alert severity="error">{error}</Alert>}

      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          onChange={handleTypeChange}
          label="Type"
        >
          {Object.values(EntryType).map((entryType) => (
            <MenuItem key={entryType} value={entryType}>
              {entryType.replace(/([a-z])([A-Z])/g, '$1 $2')}
            </MenuItem>
          ))}
        </Select>
     </FormControl>

      <TextField 
        label="Description" 
        variant="outlined" 
        fullWidth 
        value={description}
        onChange={({ target }) => setDescription(target.value)}
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
        onChange={({ target }) => setDate(target.value)}
      />

      <TextField
        label="Specialist"
        variant="outlined"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />

      <FormControl fullWidth>
        <InputLabel>Diagnosis codes</InputLabel>
        <Select
          multiple
          value={diagnosisCodes}
          onChange={handleDiagnosisCodesChange}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={{ PaperProps: { style: { maxHeight: 224, width: 250 } } }}
        >
          {availableDiagnosisCodes.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              <Checkbox checked={diagnosisCodes.indexOf(diagnosis.code) > -1} />
              <ListItemText primary={`${diagnosis.code} - ${diagnosis.name}`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {type === "Hospital" && 
        <>
          <FormLabel component="legend">Discharge</FormLabel>
            <TextField
            label="Date"
            variant="outlined"
            placeholder="YYYY-MM-DD"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={dischargeDate}
            onChange={({ target }) => setDischageDate(target.value)}
          />

          <TextField
            label="Criteria"
            variant="outlined"
            fullWidth
            value={criteria}
            onChange={({ target }) => setCriteria(target.value)}
          />
        </>
      }

      {type === "HealthCheck" && <FormControl component="fieldset">
        <FormLabel component="legend">Health Check Rating</FormLabel>
        <RadioGroup
          aria-label="health-check-rating"
          name="health-check-rating"
          value={healthCheckRating}
          onChange={handleHealthCheckRatingChange}
        >
          {Object.values(HealthCheckRating).filter((value) => typeof value === 'number').map((rating) => (
            <FormControlLabel 
              key={rating} 
              value={rating} 
              control={<Radio />} 
              label={HealthCheckRating[rating]} 
            />
          ))}
        </RadioGroup>
      </FormControl>
      }

      {type === "OccupationalHealthcare" && 
        <>
          <TextField
            label="Employer"
            variant="outlined"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />

          <FormLabel component="legend">Sick leave</FormLabel>
            <TextField
            label="Start date"
            variant="outlined"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={sickLeaveStartDate}
            onChange={({ target }) => setSickLeaveStartDate(target.value)}
          />
          <TextField
            label="End date"
            variant="outlined"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={sickLeaveEndDate}
            onChange={({ target }) => setSickLeaveEndDate(target.value)}
          />
        </>
      }

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default HealthCheckEntryForm;
