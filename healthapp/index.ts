import { calculateBmi } from './bmiCalculator.ts';
import { isNotNumber } from './helper.ts';
import { exerciseCalculator } from './exerciseCalculator.ts';

import express from 'express';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = (req.query.height);
  const weight = (req.query.weight);

  if (
    !height || !weight || typeof height !== 'string' || typeof weight !== 'string'
    || isNotNumber(height) || isNotNumber(weight)
  ) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  try {
    const bmi = calculateBmi(Number(height), Number(weight));
    return res.send({
    height,
    weight,
    bmi
  });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send({ error: error.message });
    } else {
      return res.status(400).send({ error: 'something went wrong' });
    }
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (
    !daily_exercises || !target || typeof target !== 'number' ||
    !Array.isArray(daily_exercises) || !daily_exercises.every(val => typeof val === 'number')
  ) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const result = exerciseCalculator(daily_exercises, target);
  return res.send(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});