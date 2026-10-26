import type { DiaryType } from '../types';
import Diary from './Diary';

const Diaries = ({ diaries }: { diaries: DiaryType[] }) => {
  return (
    <div>
      <h2>Diaries</h2>

      {diaries.map(diary =>
        <Diary key={diary.id} diary={diary} />
      )}
    </div>
  );
};

export default Diaries;