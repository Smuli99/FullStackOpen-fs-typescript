import { useState } from 'react';
import { Weather, Visibility } from '../types';
import type { NewDiaryType } from '../types';

interface NewDiaryFormProps {
  addDiary: (diary: NewDiaryType) => Promise<void>;
}

const NewDiaryForm = ({ addDiary }: NewDiaryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [comment, setComment] = useState('');

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    
    const newDiary: NewDiaryType = {
      date,
      weather,
      visibility,
      ...(comment !== '' && { comment })
    };

    addDiary(newDiary);

    setDate('');
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Good);
    setComment('');
  };
  
  return (
    <div>
      <h2>New Diary</h2>

      <form onSubmit={submit}>
        <label>
          Date
          <input
            type='date'
            name='date'
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
        <label>
          Weather
          <select
            name='weather'
            value={weather}
            onChange={(event) => setWeather(event.target.value as Weather)}
          >
            {Object.values(Weather).map(w =>
              <option key={w} value={w}>{w}</option>
            )}
          </select>
        </label>
        <label>
          Visibility
          <select
            name='visibility'
            value={visibility}
            onChange={(event) => setVisibility(event.target.value as Visibility)}
          >
            {Object.values(Visibility).map(v =>
              <option key={v} value={v}>{v}</option>
            )}
          </select>
        </label>
        <label>
          comment
          <input
            type='text'
            value={comment}
            onChange={(event) => setComment(event.target.value.trim())}
          />
        </label>
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default NewDiaryForm;