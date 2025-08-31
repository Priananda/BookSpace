'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AllButton from '../../src/components/AllButton';
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

const FavoritePage: React.FC = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  useEffect(() => {
    const favBooks: Book[] = JSON.parse(localStorage.getItem('favorite_book') || '[]');
    setFavoriteBooks(favBooks);
  }, []);

 
return (
  <>
    <div className="container mx-auto">
      <div>
        <div className="mt-1">
        <h2 className="mb-5 text-center text-xl font-bold"> Buku favorit anda </h2> 
        </div>
        <div className="w-56 mb-5">
        <Link href="/dashboard">
        <AllButton label="Kembali ke dashboard" />
        </Link>
        </div>
        {favoriteBooks.length === 0 ? (
        <div className="mt-5 text-md text-center">
        <p className="text-gray-500">Buku favorit anda tidak dapat ditemukan.</p>
        </div>
        ) : (
   
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {favoriteBooks.map((book, index) => (
      <li
          key={book.id ?? index}
          className="">
        <div className="w-full p-4 shadow-md flex flex-col h-full">
          {book.cover && (
            <Image
              src={book.cover}
              alt={book.title}
              width={300}
              height={400}
              className="mx-auto mb-5 rounded object-cover w-72 h-full"
              unoptimized
            />
          )}

          <h1 className="mb-3 text-xl text-start font-semibold">{book.title}</h1>
          <div className="text-start text-md space-y-2 text-gray-700 flex-grow">
            <p><strong>Penulis:</strong> {book.author}</p>
            <p><strong>Kategori:</strong> {book.category}</p>
            <p><strong>Harga:</strong> {book.price}</p>
            <p><strong>Deskripsi:</strong> {book.description || "Tidak ada deskripsi."}</p>
          </div>
        </div>
      </li>
      ))}
      </ul>
      )}
    </div>
    </div>
  </>
  );
};

export default FavoritePage;
