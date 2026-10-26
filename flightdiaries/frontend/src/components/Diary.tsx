import type { DiaryType } from '../types';

const Diary = ({ diary }: { diary: DiaryType }) => {
  return (
    <div>
      <p>
        <strong>Date:</strong> {diary.date} <br />
        <strong>Weather:</strong> {diary.weather} <br />
        <strong>Visibility:</strong> {diary.visibility} <br />
      </p>
    </div>
  );
};

export default Diary;