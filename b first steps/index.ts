import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  
  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) 
    return res.send({ 'error': 'malformatted parameters' });

  const result = calculateBmi(Number(height), Number(weight));

  return res.send({
    weight,
    height,
    result
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target)
    return res.status(400).json({ 'error': 'parameters missing' });

  if (!Array.isArray(daily_exercises) || isNaN(Number(target)) || daily_exercises.length === 0 || daily_exercises.some(isNaN)) {
    return res.status(400).json({ 'error': 'malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target);

  return res.status(200).json(result);

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});