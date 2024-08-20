import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientEntriesEntry, toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatientsNoSsn());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatient(req.params.id);

  if (patient) {
    res.json(patient); 
  } else {
    res.status(404);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntriesEntry = toNewPatientEntriesEntry(req.body);

    const addedEntry = patientsService.addEntry(id, newEntriesEntry);
    
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    
    res.status(400).send(errorMessage);
  }
});

export default router;