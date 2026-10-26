import type { CoursePart  } from '../data';

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandeled discriminated union member: ${JSON.stringify(value)}`);
  };
  
  switch (part.kind) {
    case 'basic':
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br />
          {part.description}
        </p>
      );
    case 'group':
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br />
          project exercises {part.groupProjectCount}
        </p>
      );
    case 'background':
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br />
          {part.description}
          <br />
          submit to {part.backgroundMaterial}
        </p>
      );
    case 'special':
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br />
          {part.description}
          <br />
          required skills: {part.requirements.join(', ')}
        </p>
      );
    default:
      assertNever(part);
  }
};

export default Part;