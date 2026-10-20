interface CourseParts {
  name: string;
  exerciseCount: number;
}

const Content = ({ parts }: { parts: CourseParts[] }) => {
  return (
    <div>
      {parts.map(part => (
        <p key={part.exerciseCount}>{part.name} {part.exerciseCount}</p>
      ))}
    </div>
  );
};

export default Content;