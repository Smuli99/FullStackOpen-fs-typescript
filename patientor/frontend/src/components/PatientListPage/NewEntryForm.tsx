import { useState } from 'react';
import { Alert, Button, Paper, TextField, Typography } from '@mui/material';
import { NewEntry, Entry } from '../../types';
import patientService from '../../services/patients';
import { isAxiosError } from 'axios';

type Severity = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  severity: Severity;
  message: string;
}

interface Props {
  patientId: string;
  onAdded: (entry: Entry) => void;
}

const NewEntryForm = ({ patientId, onAdded }: Props) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('0');
  const [codes, setCodes] = useState('');
  const [notify, setNotify] = useState<Notification | null>(null);
  
  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();

    const diagnosisCodes = codes.split(',').map(code => code.trim()).filter(Boolean);
    const healthCheckRating = rating.trim() === '' ? NaN : Number(rating);
    
    if (Number.isNaN(healthCheckRating)) {
      setNotify({ severity: 'error', message: 'healthCheckRating: expected number (0-3)'});
      setTimeout(() => setNotify(null), 5000);
      return;
    }
    
    const newEntry: NewEntry = {
      type: 'HealthCheck',
      date,
      description,
      specialist,
      healthCheckRating,
      ...(diagnosisCodes.length > 0 && { diagnosisCodes }),
    };

    try {
      const addedEntry = await patientService.createEntry(patientId, newEntry);
      onAdded(addedEntry);
      setNotify({ severity: 'success', message: 'Entry added!' });
      setTimeout(() => setNotify(null), 5000);
      handleCancel();
    } catch (error) {
      setNotify({ severity: 'error', message: getErrorMessage(error) });
      setTimeout(() => setNotify(null), 5000);
    }
  };

  const handleCancel = (): void => {
    setDate('');
    setDescription('');
    setSpecialist('');
    setRating('');
    setCodes('');
  };

  const getErrorMessage = (error: unknown): string => {
    if (isAxiosError(error)) {
      return `${error.response?.data.error[0].path[0]}: ${error.response?.data.error[0].message}`;
    }

    if (error instanceof Error) return error.message;
    return 'Unkown error';
  };

  return (
    <div>
      <Paper
        component='form'
        onSubmit={handleSubmit}
        sx={{ marginTop: 2, padding: 2 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          <Typography variant='h6'>New HealthCheck Entry</Typography>
          
          {notify &&
            <Alert severity={notify.severity}>{notify.message}</Alert>
          }

          <TextField
            variant='outlined'
            type='date'
            label='Date'
            value={date}
            size='small'
            onChange={e => setDate(e.target.value)}
            required
            sx={{ marginTop: 2 }}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <TextField
            variant='outlined'
            type='text'
            label='Description'
            size='small'
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />

          <TextField
            variant='outlined'
            type='text'
            label='Specialist'
            size='small'
            value={specialist}
            onChange={e => setSpecialist(e.target.value)}
            required
          />

          <TextField
            variant='outlined'
            type='text'
            label="Health Check Rating (0-3)"
            size='small'
            value={rating}
            onChange={e => setRating(e.target.value)}
            required
          />

          <TextField
            variant='outlined'
            type='text'
            label='Diagnosis Codes (comma-separated)'
            size='small'
            value={codes}
            onChange={e => setCodes(e.target.value)}
          />
        </div>

        <Button
          variant='contained'
          sx={{ marginTop: 1 }}
          type='submit'
        >
          Add
        </Button>
        
        <Button
          variant='outlined'
          onClick={handleCancel}
          sx={{ marginLeft: 1, marginTop: 1 }}
        >
          Cancel
        </Button>
      </Paper>
    </div>
  );
};

export default NewEntryForm;