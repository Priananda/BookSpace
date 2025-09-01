import { getBookById } from '../../../src/services/books/booksAPI';
import AllButton from '../../../src/components/AllButton';
import FavoriteBookId from './BookIdClient';
import Image from 'next/image';
import Link from 'next/link';

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


return (
  <>
    <div className="container mx-auto"> 
      <div className="mt-5 flex w-full justify-center items-center">
        <div className="p-4">
          {book.cover && (
          <Image
            src={book.cover}
            alt={book.title}
            width={300}
            height={400}
            className="mx-auto mb-5 rounded object-cover w-72 h-auto"
          unoptimized
          />
          )}

          <h1 className="mb-3 text-xl text-start font-semibold">{book.title}</h1>
          <div className="text-start space-y-2 text-gray-500">
            <p><strong>Penulis:</strong> {book.author}</p>
            <p><strong>Kategori:</strong> {book.category}</p>
            <p><strong>Harga:</strong> {book.price}</p>
            <p><strong>Deskripsi:</strong> {book.description || 'Tidak ada deskripsi.'}</p>
          </div>
          
          <div className="mt-5">
            <FavoriteBookId book={book} />
            <Link href="/dashboard">
              <AllButton label="Kembali ke dashboard" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
