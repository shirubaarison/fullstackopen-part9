import diagnosisData from '../../data/diagnoses';
import { DiagnosisEntry } from '../types';

const diagnoses: DiagnosisEntry[] = diagnosisData;

const getDiagnosis = (): DiagnosisEntry[] => {
  return diagnoses;
};

export default {
  getDiagnosis
};