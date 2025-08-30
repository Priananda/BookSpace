import api from '../../lib/API';

export const getBookList = async () => {
  const response = await api.get('/ListOfBooks');
  return response.data;
};

export const getBookById = async (id: string) => {
  const response = await api.get(`/ListOfBooks/${id}`);
  return response.data;
};