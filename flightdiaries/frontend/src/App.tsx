import axios from 'axios';
import { useState, useEffect } from 'react';
import type { DiaryType, NewDiaryType } from './types';

import diaryService from './diaryService';
import Diaries from './components/Diaries';
import NewDiaryForm from './components/NewDiaryForm';
import Notification from './components/Notification';

const App = () => {
  const [diaries, setDiares] = useState<DiaryType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    } catch (error) {
      let errorMessage = 'Unknown error';
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error[0].message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setErrorMessage(errorMessage);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };
  
  return (
    <div>
      <Notification message={errorMessage} />
      <NewDiaryForm addDiary={addDiary}/>
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;