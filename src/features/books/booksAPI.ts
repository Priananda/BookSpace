// src/features/books/booksAPI.ts
import api from '../../lib/API'; // sesuaikan path sesuai struktur

export const getBookList = async () => {
  const response = await api.get('/ListOfBooks'); // endpoint sesuai API mock kamu
  return response.data;
};

export const getBookById = async (id: string) => {
  const response = await api.get(`/ListOfBooks/${id}`);
  return response.data;
};