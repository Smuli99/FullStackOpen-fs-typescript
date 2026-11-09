import { useState } from 'react';
import { Alert, Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { NewEntry, Entry } from '../../types';
import patientService from '../../services/patients';
import { isAxiosError } from 'axios';
import { assertNever } from '../../constants';

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
  const [type, setType] = useState<Entry['type']>('HealthCheck');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('0');
  const [codes, setCodes] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState({ startDate: '', endDate: ''});
  const [discharge, setDischarge] = useState({ date: '', criteria: '' });
  const [notify, setNotify] = useState<Notification | null>(null);
  
  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();

    const diagnosisCodes = codes.split(',').map(code => code.trim()).filter(Boolean);
    
    const baseEntry = {
      date,
      description,
      specialist,
      ...(diagnosisCodes.length > 0 && { diagnosisCodes }),
    };

    let newEntry: NewEntry;

    switch(type) {
      case 'HealthCheck': {
        const healthCheckRating = rating.trim() === '' ? NaN : Number(rating);
        
        if (Number.isNaN(healthCheckRating)) {
          setNotify({ severity: 'error', message: 'healthCheckRating: value should be a number (0-3)' });
          setTimeout(() => setNotify(null), 5000);
          return;
        }
        
        newEntry = {
          ...baseEntry,
          type,
          healthCheckRating
        };
        break;
      }
      case 'OccupationalHealthcare': {
        const { startDate, endDate } = sickLeave;

        if ((startDate && !endDate) || (!startDate && endDate)) {
          setNotify({
            severity: 'error',
            message: 'sickLeave: both start date and end date are required'
          });
          setTimeout(() => setNotify(null), 5000);
          return;
        }

        newEntry = {
          ...baseEntry,
          type,
          employerName,
          ...(startDate && endDate && { sickLeave }),
        };
        break;
      }
      case 'Hospital':
        newEntry = {
          ...baseEntry,
          type,
          discharge
        };
        break;
      default:
        return assertNever(type);
    }

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
    setRating('0');
    setCodes('');
    setEmployerName('');
    setSickLeave({ startDate: '', endDate: '' });
    setDischarge({ date: '', criteria: '' });
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

          <Typography variant='h6'>New Entry</Typography>
          
          {notify &&
            <Alert severity={notify.severity}>{notify.message}</Alert>
          }

          <TextField
            select
            variant='outlined'
            label='Entry type'
            value={type}
            onChange={e => setType(e.target.value as Entry['type'])}
            size='small'
            defaultValue={type}
            required
            sx={{ marginTop: 2 }}
          >
            <MenuItem value='HealthCheck'>Health Check</MenuItem>
            <MenuItem value='OccupationalHealthcare'>Occupational Healthcare</MenuItem>
            <MenuItem value='Hospital'>Hospital</MenuItem>
          </TextField>

          <TextField
            variant='outlined'
            type='date'
            label='Date'
            value={date}
            size='small'
            onChange={e => setDate(e.target.value)}
            required
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

          {type === 'HealthCheck' && (
            <TextField
              variant='outlined'
              type='text'
              label="Health Check Rating (0-3)"
              size='small'
              value={rating}
              onChange={e => setRating(e.target.value)}
              required
            />
          )}

          {type === 'OccupationalHealthcare' && (
            <div>
              <TextField
                variant='outlined'
                type='text'
                size='small'
                label='Employer name'
                value={employerName}
                onChange={e => setEmployerName(e.target.value)}
                required
              />

              <Typography variant='body1' sx={{ marginTop: 1, marginBottom: 1 }}>Sick Leave</Typography>

              <TextField
                variant='outlined'
                type='date'
                size='small'
                label='Start Date'
                value={sickLeave.startDate}
                onChange={e => setSickLeave({ ...sickLeave, startDate: e.target.value })}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{ marginRight: 2 }}
              />
              
              <TextField
                variant='outlined'
                type='date'
                size='small'
                label='End Date'
                value={sickLeave.endDate}
                onChange={e => setSickLeave({ ...sickLeave, endDate: e.target.value })}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </div>
          )}

          <TextField
            variant='outlined'
            type='text'
            label='Diagnosis Codes (comma-separated)'
            size='small'
            value={codes}
            onChange={e => setCodes(e.target.value)}
          />

          {type === 'Hospital' && (
            <div>
              <Typography variant='body1' sx={{ marginTop: 1, marginBottom: 1 }}>Discharge</Typography>

              <TextField
                variant='outlined'
                type='date'
                size='small'
                label='Date'
                value={discharge.date}
                onChange={e => setDischarge({ ...discharge, date: e.target.value })}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{ marginRight: 2, marginBottom: 1 }}
                fullWidth
                required
              />

              <TextField
                variant='outlined'
                type='text'
                size='small'
                label='Criteria'
                value={discharge.criteria}
                onChange={e => setDischarge({ ...discharge, criteria: e.target.value })}
                fullWidth
                required
              />
            </div>
          )}
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