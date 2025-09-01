import { getBookList } from '../../src/services/books/booksAPI';
import BookListClient from './BookListClient';

export default async function Dashboard() {
  const books = await getBookList();

  return (
    <div className="p-4">
      {/* Passing data ke BookListClient */}
      <BookListClient initialBooks={books} />
    </div>
  );
}
