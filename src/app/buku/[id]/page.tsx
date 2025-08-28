'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getBookById } from '../../../features/books/booksAPI';
import Image from 'next/image';
interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  description: string;
  cover: string;
}

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id as string);
        setBook(data);

        const favs = JSON.parse(localStorage.getItem('favorite_book') || '[]');
        setIsFavorited(favs.some((b: Book) => b.id === data.id));
      } catch (error) {
        console.error('Gagal memuat buku:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

const handleAddFavorite = () => {
  if (!book) return;

  // Ambil data favorit dari localStorage, default array kosong
  const existing: Book[] = JSON.parse(localStorage.getItem('favorite_book') || '[]');

  // Cek apakah buku sudah ada supaya tidak duplikat
  if (existing.some(b => b.id === book.id)) return;

  // Tambah buku ke favorit
  const updated = [...existing, book];
  localStorage.setItem('favorite_book', JSON.stringify(updated));
  setIsFavorited(true);
};


  if (loading) return <p>Memuat detail buku...</p>;
  if (!book) return <p>Buku tidak ditemukan.</p>;

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
    


      <button className='px-10 py-3 bg-blue-700 rounded-full text-white mt-5' onClick={handleAddFavorite} disabled={isFavorited}>
        {isFavorited ? 'Sudah di Favorite' : 'Tambahkan ke Favorite'}
      </button>
    </div>
  );
};

export default BookDetail;
