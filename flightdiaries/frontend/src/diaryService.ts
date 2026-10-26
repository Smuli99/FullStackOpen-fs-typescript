import axios from 'axios';
import type { Diary } from './types';

const baseUrl = '/api/diaries';

const getAll = async () => {
  const res = await axios.get<Diary[]>(baseUrl);
  return res.data;
};

export default { getAll, };