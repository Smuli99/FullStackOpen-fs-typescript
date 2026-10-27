export const apiBaseUrl = 'http://localhost:3001/api';

export const assertNever = (value: never): never => {
  throw new Error(`Unhandeled discriminated union member: ${JSON.stringify(value)}`);
};
