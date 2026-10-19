import express from 'express';
import cors from 'cors';
import pingRouter from './routes/ping.ts';
import diagnoseRouter from './routes/diagnoses.ts';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnoseRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});