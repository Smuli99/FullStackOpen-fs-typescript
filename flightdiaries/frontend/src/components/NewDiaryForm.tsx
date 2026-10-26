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
      <h3>Add New Diary</h3>

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
          Visibility:
      
          {Object.values(Visibility).map(v =>
            <label key={v} style={{ marginLeft: 5 }}>
              {v}
              <input
                type='radio'
                name='visibility'
                value={v}
                checked={visibility === v}
                onChange={(event) => setVisibility(event.target.value as Visibility)}
              />
            </label>
          )}
        </label>
        <label>
          Weather:
          
          {Object.values(Weather).map(w =>
            <label key={w} style={{ marginLeft: 5 }}>
              {w}
              <input
                type='radio'
                name='weather'
                value={w}
                checked={weather === w}
                onChange={(event) => setWeather(event.target.value as Weather)}
              />
            </label>
          )}
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