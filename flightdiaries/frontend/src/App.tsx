import { useState, useEffect } from 'react';
import type { Diary } from './types';

import diaryService from './diaryService';

const App = () => {
  const [diaries, setDiares] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await diaryService.getAll();
      setDiares(data);
    };

    fetchData();
  }, []);
  
  return (
    <div>
      <h2>Diaries</h2>
      {diaries.map(diary =>
        <p key={diary.id}>
          Date: {diary.date} <br />
          Weather: {diary.weather} <br />
          Visibility: {diary.visibility}
        </p>
      )}
    </div>
  );
};

export default App;