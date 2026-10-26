import { useState, useEffect } from 'react';
import type { DiaryType, NewDiaryType } from './types';

import diaryService from './diaryService';
import Diaries from './components/Diaries';
import NewDiaryForm from './components/NewDiaryForm';

const App = () => {
  const [diaries, setDiares] = useState<DiaryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await diaryService.getAll();
      setDiares(data);
    };

    fetchData();
  }, []);

  const addDiary = async (diary: NewDiaryType) => {
    try {
      const newDiary: DiaryType = await diaryService.create(diary);
      setDiares(diaries.concat(newDiary));
    } catch (error: unknown) {
      let errorMessage = 'Oops';
      if (error instanceof Error) {
        errorMessage += ` error: ${error.message}`;
      }
      console.log(errorMessage);
    }
  };
  
  return (
    <div>
      <Diaries diaries={diaries} />
      <NewDiaryForm addDiary={addDiary}/>
    </div>
  );
};

export default App;