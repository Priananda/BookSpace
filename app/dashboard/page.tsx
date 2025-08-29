// app/dashboard/page.tsx
import React from 'react';
import { getBookList } from '../../src/features/books/booksAPI';
import BookListClient from './BookListClient';


export default async function Dashboard() {
  const books = await getBookList();

  return (
    <div className="p-4">
      {/* <h2 className="text-2xl font-bold mb-4">📚 Dashboard Buku</h2> */}
      {/* Passing data awal ke client component */}
      <BookListClient initialBooks={books} />
    </div>
  );
}
