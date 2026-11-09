import { useRef, useState } from 'react';
import { NewEntry, Entry, HealthCheckRating, Diagnosis } from '../../types';
import { isAxiosError } from 'axios';
import { assertNever } from '../../constants';
import { useDiagnoses } from '../../hooks';

import patientService from '../../services/patients';

import {
  Alert, Button, Checkbox, FormControl, InputLabel,
  ListItemText, MenuItem, OutlinedInput, Paper,
  Select, SelectChangeEvent, Typography
} from '@mui/material';

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
  const { diagnoses } = useDiagnoses();

  const [type, setType] = useState<Entry['type']>('HealthCheck');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState({ startDate: '', endDate: '' });
  const [discharge, setDischarge] = useState({ date: '', criteria: '' });
  const [notify, setNotify] = useState<Notification | null>(null);

  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const showNotification = (severity: Severity, message: string): void => {
    clearTimeout(timer.current);
    setNotify({ severity, message });
    timer.current = setTimeout(() => setNotify(null), 5000);
  };

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();

    const baseEntry = {
      date,
      description,
      specialist,
      ...(diagnosisCodes.length > 0 && { diagnosisCodes }),
    };

    let newEntry: NewEntry;

    switch (type) {
      case 'HealthCheck': {
        newEntry = {
          ...baseEntry,
          type,
          healthCheckRating: rating,
        };
        break;
      }
      case 'OccupationalHealthcare': {
        const { startDate, endDate } = sickLeave;

        if (Boolean(startDate) !== Boolean(endDate)) {
          showNotification('error', 'sickLeave: both start date and end date are required');
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
      case 'Hospital': {
        newEntry = {
          ...baseEntry,
          type,
          discharge,
        };
        break;
      }
      default:
        return assertNever(type);
    }

    try {
      const addedEntry = await patientService.createEntry(patientId, newEntry);
      onAdded(addedEntry);
      handleCancel();
      showNotification('success', 'Entry added!');
    } catch (error) {
      showNotification('error', getErrorMessage(error));
    }
  };

  const handleCancel = (): void => {
    setDate('');
    setDescription('');
    setSpecialist('');
    setRating(HealthCheckRating.Healthy);
    setDiagnosisCodes([]);
    setEmployerName('');
    setSickLeave({ startDate: '', endDate: '' });
    setDischarge({ date: '', criteria: '' });
  };

  const getErrorMessage = (error: unknown): string => {
    if (isAxiosError(error)) {
      const issue = error.response?.data?.error?.[0];
      if (issue) return `${issue.path?.[0]}: ${issue.message}`;
      return error.message;
    }
    if (error instanceof Error) return error.message;
    return 'Unknown error';
  };

  const handleCodesChange = (event: SelectChangeEvent<string[]>): void => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
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

          {/* Entry Type */}
          <FormControl size='small' required>
            <InputLabel id='type-label'>Entry Type</InputLabel>
            <Select
              labelId='type-label'
              value={type}
              label='Entry Type'
              onChange={e => setType(e.target.value as Entry['type'])}
            >
              <MenuItem value='HealthCheck'>Health Check</MenuItem>
              <MenuItem value='OccupationalHealthcare'>Occupational Healthcare</MenuItem>
              <MenuItem value='Hospital'>Hospital</MenuItem>
            </Select>
          </FormControl>

          {/* Date */}
          <FormControl size='small' required>
            <InputLabel htmlFor='date' shrink>Date</InputLabel>
            <OutlinedInput
              id='date'
              type='date'
              label='Date'
              notched
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </FormControl>

          {/* Description */}
          <FormControl size='small' required>
            <InputLabel htmlFor='description'>Description</InputLabel>
            <OutlinedInput
              id='description'
              label='Description'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </FormControl>

          {/* Specialist */}
          <FormControl size='small' required>
            <InputLabel htmlFor='specialist'>Specialist</InputLabel>
            <OutlinedInput
              id='specialist'
              label='Specialist'
              value={specialist}
              onChange={e => setSpecialist(e.target.value)}
            />
          </FormControl>

          {/* HealthCheck */}
          {type === 'HealthCheck' && (
            <FormControl size='small' required>
              <InputLabel id='rating-label'>Health Check Rating</InputLabel>
              <Select
                labelId='rating-label'
                label='Health Check Rating'
                value={rating}
                onChange={e => setRating(Number(e.target.value) as HealthCheckRating)}
              >
                <MenuItem value={HealthCheckRating.Healthy}>0 - Healthy</MenuItem>
                <MenuItem value={HealthCheckRating.LowRisk}>1 - Low Risk</MenuItem>
                <MenuItem value={HealthCheckRating.HighRisk}>2 - High Risk</MenuItem>
                <MenuItem value={HealthCheckRating.CriticalRisk}>3 - Critical Risk</MenuItem>
              </Select>
            </FormControl>
          )}

          {/* OccupationalHealthcare */}
          {type === 'OccupationalHealthcare' && (
            <>
              <FormControl size='small' required>
                <InputLabel htmlFor='employer'>Employer name</InputLabel>
                <OutlinedInput
                  id='employer'
                  label='Employer name'
                  value={employerName}
                  onChange={e => setEmployerName(e.target.value)}
                />
              </FormControl>

              <Typography variant='body1'>Sick Leave</Typography>

              <div style={{ display: 'flex', gap: 16 }}>
                <FormControl size='small' fullWidth>
                  <InputLabel htmlFor='sl-start' shrink>Start date</InputLabel>
                  <OutlinedInput
                    id='sl-start'
                    type='date'
                    label='Start date'
                    notched
                    value={sickLeave.startDate}
                    onChange={e => setSickLeave({ ...sickLeave, startDate: e.target.value })}
                  />
                </FormControl>

                <FormControl size='small' fullWidth>
                  <InputLabel htmlFor='sl-end' shrink>End date</InputLabel>
                  <OutlinedInput
                    id='sl-end'
                    type='date'
                    label='End date'
                    notched
                    value={sickLeave.endDate}
                    onChange={e => setSickLeave({ ...sickLeave, endDate: e.target.value })}
                  />
                </FormControl>
              </div>
            </>
          )}

          {/* DiagnosisCodes */}
          <FormControl size='small'>
            <InputLabel id='codes-label'>Diagnosis Codes</InputLabel>
            <Select
              labelId='codes-label'
              label='Diagnosis Codes'
              multiple
              value={diagnosisCodes}
              onChange={handleCodesChange}
              renderValue={selected => selected.join(', ')}
              MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
            >
              {diagnoses.map(d => (
                <MenuItem key={d.code} value={d.code}>
                  <Checkbox checked={diagnosisCodes.includes(d.code)} />
                  <ListItemText primary={`${d.code} - ${d.name}`} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Hospital */}
          {type === 'Hospital' && (
            <>
              <Typography variant='body1'>Discharge</Typography>

              <FormControl size='small' required>
                <InputLabel htmlFor='discharge-date' shrink>Discharge date</InputLabel>
                <OutlinedInput
                  id='discharge-date'
                  type='date'
                  label='Discharge date'
                  notched
                  value={discharge.date}
                  onChange={e => setDischarge({ ...discharge, date: e.target.value })}
                />
              </FormControl>

              <FormControl size='small' required>
                <InputLabel htmlFor='discharge-criteria'>Criteria</InputLabel>
                <OutlinedInput
                  id='discharge-criteria'
                  label='Criteria'
                  value={discharge.criteria}
                  onChange={e => setDischarge({ ...discharge, criteria: e.target.value })}
                />
              </FormControl>
            </>
          )}
        </div>

        <Button variant='contained' sx={{ marginTop: 1 }} type='submit'>
          Add New Entry
        </Button>

        <Button variant='outlined' onClick={handleCancel} sx={{ marginLeft: 1, marginTop: 1 }}>
          Cancel
        </Button>
      </Paper>
    </div>
  );
};

export default NewEntryForm;