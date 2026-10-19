import { calculateBmi } from './bmiCalculator.ts';
import { isNotNumber } from './helper.ts';

import express from 'express';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height: string = String(req.query.height);
  const weight: string = String(req.query.weight);

  if (!height || !weight || isNotNumber(height) || isNotNumber(weight)) {
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});