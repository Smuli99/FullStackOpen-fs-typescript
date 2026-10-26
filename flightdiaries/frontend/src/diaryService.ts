import axios from 'axios';
import type { DiaryType, NewDiaryType } from './types';

const baseUrl = '/api/diaries';

const getAll = async () => {
  const res = await axios.get<DiaryType[]>(baseUrl);
  return res.data;
};

const create = async (diary: NewDiaryType) => {
  const res = await axios.post<DiaryType>(baseUrl, diary);
  return res.data;
};

export default { getAll, create };