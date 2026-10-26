import { z } from 'zod';

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string().regex(/^\d{5,}-\d{2,}[a-zA-Z]?$/),
  gender: z.enum(Gender),
  occupation: z.string()
});

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
  // TODO
}

export interface PatientEntry extends NewPatientEntry {
  id: string;
  entries: Entry[];
};

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;