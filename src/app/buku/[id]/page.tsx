import { getBookById } from '../../../features/books/booksAPI';
import Image from 'next/image';
import FavoriteBookId from './BookIdClient';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  description: string;
  cover: string;
}

interface BookPageProps {
  params: { id: string };
}

export default async function BookDetailPage({ params }: BookPageProps) {
  const book: Book = await getBookById(params.id);

  if (!book) {
    return <p>Buku tidak ditemukan.</p>;
  }

  return (
    <div>
      {book.cover && (
        <Image
          src={book.cover}
          alt={book.title}
          width={300}
          height={400}
          className="rounded mb-2 object-cover"
        />
      )}
      <h1>{book.title}</h1>
      <p><strong>Penulis:</strong> {book.author}</p>
      <p><strong>Kategori:</strong> {book.category}</p>
      <p><strong>Harga:</strong> {book.price}</p>
      <p><strong>Deskripsi:</strong> {book.description || 'Tidak ada deskripsi.'}</p>

      <FavoriteBookId  book={book} />
    </div>
  );
}
