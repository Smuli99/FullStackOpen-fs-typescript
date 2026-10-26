import type { DiaryType } from '../types';

const Diary = ({ diary }: { diary: DiaryType }) => {
  return (
    <div>
      <h4>{diary.date}</h4>
      <p>
        visibility: {diary.visibility} <br />
        weather: {diary.weather}
      </p>
    </div>
  );
};

export default Diary;